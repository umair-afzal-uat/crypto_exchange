<?php

namespace App\Services\Payments\Bitcoin;

use App\Models\LoanMainSettings;
use App\Services\Base\Bitcoin\BaseBitcoinService;

class BitcoinService extends BaseBitcoinService
{
    public $bitcoind;

    public function __construct()
    {
        $this->code = 'bitcoin';
        parent::__construct();
    }

    /**
     * @return string
     */
    public function getHotWalletAddress(): string
    {
        $settings = LoanMainSettings::first();
        // dd($settings);
        if (is_null($settings->bitcoin_wallet)) {
            $hotAddressJson = $this->generateHotAddress();

            $address =  json_decode($hotAddressJson, true)['address'];

            $settings->update([
                'bitcoin_wallet' => $address
            ]);

            return $address;
        }

        return $settings->bitcoin_wallet;
    }

    /**
     * Create transaction for current currency.
     *
     * @param $addressDataInput
     * @param string $addressDataOutput
     * @param float $amount
     * @return string
     */
    public function createTransaction($addressDataInput, string $addressDataOutput, float $amount)
    {
        return $this->bitcoind->request('sendtoaddress', $addressDataOutput, (string)$amount)->get();
    }

    public function createMultiSignAddress(array $publicKeys)
    {
        return $this->bitcoind->request('createmultisig', count($publicKeys), $publicKeys)->get();
    }

    public function addMultiSignAddress(array $addresses)
    {
        return $this->bitcoind->request('addmultisigaddress', count($addresses), $addresses)->get();
    }

    public function getInfo()
    {
        return $this->bitcoind->request('getinfo')->get();
    }

    public function getPrivateKey($address)
    {
        return $this->bitcoind->request('dumpprivkey', $address)->get();
    }

    public function createWallet($walletName)
    {
        return $this->bitcoind->request('createwallet', $walletName)->get();
    }

    /** Encrypts the wallet with 'passphrase'.
     *  After this, any calls that interact with private keys such as sending or signing
     *  will require the passphrase to be set prior the making these calls.
     * @param string $phrase
     * @return
     */
    public function encryptWallet(string $phrase)
    {
        return $this->bitcoind->request('encryptwallet', $phrase)->get();
    }

    /**
     * Stores the wallet decryption key in memory for 'timeout' seconds.
     * This is needed prior to performing transactions related to private keys such as sending bitcoins
     * @param string $phrase
     * @param int $time
     * @return
     */
    public function walletPassphrase(string $phrase, int $time)
    {
        return $this->bitcoind->request('walletpassphrase', $phrase, $time)->get();
    }

    public function loadWallet($walletName)
    {
        return $this->bitcoind->request('loadwallet', $walletName)->get();
    }

    public function unloadWallet($walletName)
    {
        return $this->bitcoind->request('unloadwallet', $walletName)->get();
    }

    public function getWalletInfo()
    {
        return $this->bitcoind->request('getwalletinfo')->get();
    }

    public function getListUnspent($addresses = [])
    {
        $minConfirmations = 3;
        $maxConfirmations = 9999999;

        return $this->bitcoind->request('listunspent', $minConfirmations, $maxConfirmations, $addresses)->get();
    }

    public function getAddressInfo($address)
    {
        return $this->bitcoind->request('getaddressinfo', $address)->get();
    }

    public function getListWallets()
    {
        return $this->bitcoind->request('listwallets')->get();
    }

    public function getListAddresses()
    {
        return $this->bitcoind->request('getaddressesbylabel', '')->get();
    }

    public function prepareDataForRawTransaction(string $addressDataOutput, $amount)
    {
        $inputs = [];
        $outputs = [];

        $unspentTxs = $this->getListUnspent(['2N9KMuatH8FxP2zwKSQvKKWyBUeACsHeh1Q']);

        foreach ($unspentTxs as $key => $tx) {
            $inputs[$key]['txid'] = $tx['txid'];
            $inputs[$key]['vout'] = $tx['vout'];
        }
        $outputs[$addressDataOutput] = $amount;

        return $this->createRawTransaction($inputs, $outputs);
    }

    public function createRawTransaction(array $inputs, array $outputs)
    {
        return $this->bitcoind->request('createrawtransaction', $inputs, $outputs)->get();
    }

    public function signRawTransaction(string $hex, $prevTx, $privateKeys)
    {
        return $this->bitcoind->request('signrawtransactionwithkey', $hex, $privateKeys, $prevTx)->get();
    }

    public function decodeScript(string $script)
    {
        return $this->bitcoind->request('decodescript', $script)->get();
    }

    public function decodeRawTransaction(string $script)
    {
        return $this->bitcoind->request('decoderawtransaction', $script)->get();
    }

    public function getRawTransaction(string $script)
    {
        return $this->bitcoind->request('getrawtransaction', $script, true)->get();
    }

    public function sendRawTransaction(string $script)
    {
        return $this->bitcoind->request('sendrawtransaction', $script)->get();
    }

    /**
     * Return address list with balances in node wallet
     * @return array
     */
    public function getAddressGroupingsForWallet(): array
    {
        return $this->bitcoind->request('listaddressgroupings')->get();
    }

    public function testMethod($address)
    {
        return $this->bitcoind->request('getaddressinfo', $address)->get();
    }
}
