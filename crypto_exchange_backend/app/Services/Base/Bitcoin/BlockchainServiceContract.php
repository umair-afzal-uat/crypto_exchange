<?php


namespace App\Services\Base\Bitcoin;

interface BlockchainServiceContract
{
    /**
     * Create transaction for current currency.
     *
     * @param $addressDataInput
     * @param string $addressDataOutput
     * @param float $amount
     * @return string
     */
    public function createTransaction($addressDataInput, string $addressDataOutput, float $amount);

    /**
     * Generate wallet address for user
     *
     * @param string $assetCode
     * @param string $chain
     */
    public function generateAddress(string $assetCode = null, string $chain = null);

    /**
     * Return  total wallet balance
     *
     * @param string $address
     * @param string $assetCode
     * @param string|null $chain
     */
    public function getWalletBalance(string $address = null, string $assetCode = null, string $chain = null);
}
