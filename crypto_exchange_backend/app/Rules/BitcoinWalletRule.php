<?php

namespace App\Rules;

use App\Exceptions\ErrorMessages;
use App\Services\Payments\Bitcoin\BitcoinService;
use Illuminate\Contracts\Validation\Rule;

class BitcoinWalletRule implements Rule
{

    private BitcoinService $service;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->service = resolve(BitcoinService::class);
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $address)
    {
        $address = $this->service->bitcoind->request('validateaddress', $address)->get();

        if ($address == false ) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return ErrorMessages::INCORRECT_WALLET_ADDRESS;
    }
}
