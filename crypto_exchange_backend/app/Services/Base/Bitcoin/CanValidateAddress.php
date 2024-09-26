<?php


namespace App\Services\Base\Bitcoin;

interface CanValidateAddress
{
    /**
     * @param string $address
     * @param string $asset_code
     * @param string|null $chain
     * @return boolean
     */
    public function checkValidWalletAddress(string $address, string $asset_code, string $chain = null);
}
