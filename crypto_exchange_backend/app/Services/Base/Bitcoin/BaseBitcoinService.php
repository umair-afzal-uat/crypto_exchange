<?php


namespace App\Services\Base\Bitcoin;

use App\Models\Balance;
use App\Models\Wallets\HotColdTransaction;
use App\Models\Transaction;
use App\Models\WithdrawalRequest;
use Denpa\Bitcoin\Client as BitcoinClient;
use Illuminate\Support\Facades\DB;


class BaseBitcoinService  implements BlockchainServiceContract, CanValidateAddress
{
    protected $bitcoind;
    protected $code;

    public function __construct()
    {
        $this->bitcoind = new BitcoinClient([
            'scheme' => 'http',
            'host'   => config('blockchain.'.$this->code.'.host'),
            'port'   => config('blockchain.'.$this->code.'.port'),
            'user'   => config('blockchain.'.$this->code.'.user'),
            'pass'   => config('blockchain.'.$this->code.'.pwd'),
        ]);
    }

    public function createTransaction($addressDataInput, string $addressDataOutput, float $amount)
    {
        return $this->bitcoind->request('sendtoaddress', $addressDataOutput, $amount)->get();
    }

    /**
     * Generate wallet address for user
     *
     * @param string $assetCode
     * @param string $chain
     * @return false|string
     */
    public function generateAddress(string $assetCode = null, string $chain = null)
    {
        $response['address'] = $this->bitcoind->request('getnewaddress')->get();
        $response['public']  = 'none';
        $response['private'] = 'none';

        return json_encode($response);
    }

    /**
     * Generate hot address for dashboard
     *
     * @return false|string
     */
    public function generateHotAddress()
    {
        $response['address'] = $this->bitcoind->request('getnewaddress')->get();
        $response['public']  = 'none';
        $response['private'] = 'none';

        return json_encode($response);
    }

    /**
     * Return  total wallet balance
     *
     * @param string $address
     * @param string $assetCode
     * @param string|null $chain
     * @return mixed
     */
    public function getWalletBalance(string $address = null, string $assetCode = null, string $chain = null)
    {
        return $this->bitcoind->request('getbalance')->get();
    }

    /**
     *  Return last block number
     * @return int
     */
    public function getBlockCount(): int
    {
        return $this->bitcoind->request('getblockcount')->get();
    }

    /**
     * Return address list in node wallet
     * @return array
     */
    public function getAddressListForWallet(): array
    {
        return $this->bitcoind->request('getaddressesbylabel', '')->get();
    }

    /**
     * Return hash of current block
     * @param $id
     * @return mixed
     */
    public function getBlockHash($id)
    {
        return $this->bitcoind->request('getblockhash', $id)->get();
    }

    /**
     * Return list of transactions since block with given id
     * @param $id
     * @return mixed
     */
    public function getLastTx($id)
    {
        $hash = $this->getBlockHash($id);
        return $this->bitcoind->request('listsinceblock', $hash)->get();
    }

    /**
     * Get detailed information about in-wallet transaction <txid>
     * @param string $txid
     * @return mixed
     */
    public function getTransaction(string $txid)
    {
        return $this->bitcoind->request('gettransaction', $txid)->get();
    }

    /**
     * Check is address is valid Crypto address
     * @param string $address
     * @param string $asset_code
     * @param string|null $chain
     * @return boolean
     */
    public function checkValidWalletAddress(string $address, string $asset_code, string $chain = null)
    {
        return $this->bitcoind->request('validateaddress', $address)->get()['isvalid'];
    }

    /**
     * Rescan income crypto transactions for applying user deposit
     * @param Transaction $transaction
     * @throws \Throwable
     */
    public function updateTransactionStatus(Transaction $transaction): void
    {
        $tx = $this->getTransaction($transaction->hash);

        if ($tx['confirmations'] >= config('blockchain.'.$this->code.'.confirmations')) {
            foreach ($tx['details'] as $detail) {
                if ($transaction->address === $detail['address']) {
                    $balance = Balance::where('top_up_address', $detail['address'])->first();

                    DB::transaction(function () use ($transaction, $tx, $balance) {
                        /** @var Balance $balance */
                        $balance->applyDeposit($transaction->total, $transaction->fee);

                        $transaction->update([
                            'status'         => WithdrawalRequest::STATUS_PROCESSED,
                            'is_transferred' => 1,
                            'confirmation_count' => $tx['confirmations']
                        ]);
                    });
                }
            }
        }
        $transaction->update(['confirmation_count' => $tx['confirmations']]);
    }

    public function updateWithdrawalStatus(WithdrawalRequest $withdrawal): void
    {
        $tx = $this->getTransaction($withdrawal->tx_hash);

        if (!$tx) {
            return;
        }

        if ($tx['confirmations'] >= config('blockchain.'.$this->code.'.withdrawal_confirmations')) {
            $withdrawalAddress = $withdrawal->address;

            // bch has legacy and normal address format; In tx we have normal format
            if ($this->code === 'bch') {
                $address = $this->bitcoind->request('validateaddress', $withdrawal->address)->get()['address'];
                if ($tx['details'][0]['address'] === $address) {
                    $withdrawalAddress = $address;
                }
            }
            if ($withdrawalAddress === $tx['details'][0]['address'] || $this->code === 'ltc') {
                $wallet = $withdrawal->wallet;

                try {
                    DB::transaction(function () use ($withdrawal, $wallet) {
                        $wallet->updateFrozenBalanceByWithdrawal($withdrawal);

                        $withdrawal->update(['status' => WithdrawalRequest::STATUS_PROCESSED]);
                    });
                } catch (\Throwable $e) {
                    logger('Asset_id: ' . $wallet->asset_id . "\n" . 'UpdateWithdrawalStatus: ' . $e->getMessage());
                }

            }
        }
        $withdrawal->update(['confirmation_count' => $tx['confirmations']]);
    }

    /**
     * @param HotColdTransaction $transaction
     */
    public function updateHotColdTransactionStatus(HotColdTransaction $transaction): void
    {
        $tx = $this->getTransaction($transaction->tx_hash);

        if (! $tx) {
            return;
        }

        if ($tx['confirmations'] >= 2) {
            $transaction->update([
                'status' => HotColdTransaction::STATUS_SUCCESS
            ]);
        }
    }
}
