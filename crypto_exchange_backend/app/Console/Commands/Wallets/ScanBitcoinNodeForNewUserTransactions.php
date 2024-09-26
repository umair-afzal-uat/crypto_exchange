<?php

namespace App\Console\Commands\Wallets;

use App\Models\Asset;

use App\Models\LoanMainSettings;
use App\Models\Wallets\BlockchainData;
use App\Models\Wallets\HotColdTransaction;
use App\Services\Base\Bitcoin\BaseBitcoinService;
use App\Services\Payments\Bitcoin\BitcoinService;
use App\Traits\SaveCronError;
use Illuminate\Console\Command;

class ScanBitcoinNodeForNewUserTransactions extends Command
{
    use SaveCronError;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scanBtcNode:start {--asset=0}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scan Bitcoin node for new user incoming transactions';

    protected $baseBitcoinService;

    /**
     * Create a new command instance.
     *
     * @param ServiceResolver $serviceResolver
     */
    public function __construct(BitcoinService $baseBitcoinService)
    {
        parent::__construct();

        $this->baseBitcoinService = $baseBitcoinService;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
                    $asset = Asset::where('code', Asset::BTC)->first();

        try {
            # получаем последний блок
            $totalBlock = $this->baseBitcoinService->getBlockCount();

            # вытягиваем ассет

            if (BlockchainData::count() == 0) {
                BlockchainData::create(['code' =>  $asset->code, 'last_scan_block' => $totalBlock]);
            }

            # данные о последнем блоке который сканировали
            $btcData  = BlockchainData::where('code', Asset::BTC)->first();

            # получить последние транзакции
            $lastTxs = $this->baseBitcoinService->getLastTx($btcData->last_scan_block);

            $hotWalletAddress = LoanMainSettings::first()->bitcoin_wallet;


            //scan each transaction for user address and update balance
            foreach ($lastTxs['transactions'] as $tx) {
                //Skip ProofOfStake or maybe other action which generated coins - this in not deposit

                if ($tx['category'] === 'generate') {
                    continue;
                }

                if ($tx['address'] === $hotWalletAddress) {

                   if ($this->alreadyHasHotTx($tx['txid'], $asset->id)) {
                        continue;
                   }
                    $this->saveHotTransaction($tx, $asset);
                }
            }

            $btcData->update(['last_scan_block' => $totalBlock]);

        } catch (\Exception $e) {
            // $this->saveError(__CLASS__, $e, $asset->id);
            $this->saveError(__CLASS__, $e, null);
        }
    }

    private function alreadyHasHotTx($hash, int $assetId): bool
    {
        $transactionsHash = HotColdTransaction::where('asset_id', $assetId)->pluck('tx_hash')->toArray();

        return \in_array($hash, $transactionsHash);
    }

    /**
     * @param $tx
     * @param Asset $asset
     */
    private function saveHotTransaction($tx, Asset $asset): void
    {
        $hotTransaction = new HotColdTransaction();

        $hotTransaction->asset_id     = $asset->id;
        $hotTransaction->type         = HotColdTransaction::TYPE_TO_HOT;
        $hotTransaction->amount       = $tx['amount'];
        $hotTransaction->address_to   = $tx['address'];
        $hotTransaction->address_from = '';
        $hotTransaction->tx_hash      = $tx['txid'];
        $hotTransaction->status       = HotColdTransaction::STATUS_PENDING;

        $hotTransaction->save();
    }
}
