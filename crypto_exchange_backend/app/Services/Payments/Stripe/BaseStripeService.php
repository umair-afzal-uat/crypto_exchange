<?php

namespace App\Services\Payments\Stripe;

use App\Exceptions\ErrorMessages;
use App\Exceptions\Payments\Stripe\StripePaymentException;
use Illuminate\Http\Response;
use Stripe\Charge;
use Stripe\Exception\ApiErrorException;
use Stripe\Exception\CardException;
use Stripe\Stripe;
use Stripe\StripeClient;

class BaseStripeService
{
    // Constants

    public const BASE_CURRENCY = 'usd';

    public const BASE_COUNTRY = 'US';

    // Variables

    private StripeClient $stripeClient;

    // Functions

    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
        $this->stripeClient = new StripeClient(config('services.stripe.secret'));
    }

    /**
     * @param $data
     *
     * @return mixed
     * @throws \App\Exceptions\Stripe\StripePaymentException
     * @throws \Stripe\Exception\ApiErrorException
     */
    public function createCardToken(array $data)
    {
        try {
            $token = $this->stripeClient->tokens->create(
                [
                    'card' => [
                        'number'    => $data['number'],
                        'exp_month' => $data['exp_month'],
                        'exp_year'  => $data['exp_year'],
                        'cvc'       => $data['cvc'],
                    ],
                ]
            )->values()[0];
        } catch (CardException $e) {
            throw new StripePaymentException($e->getMessage(), $e->getHttpStatus());
        }

        return $token;
    }

    /**
     * @param        $amount
     * @param        $currency
     * @param        $token
     *
     * @param string $paymentFor
     *
     * @return \Stripe\Charge
     * @throws ApiErrorException
     * @throws StripePaymentException
     */
    public function doCharge($amount, $currency, $token, string $paymentFor)
    {
        $charge = Charge::create(
            [
                'amount' => $amount * 100,
                'currency' => $currency,
                'description' => "Payment for item " . $paymentFor,
                'source' => $token,
            ]
        );

        if (!$charge->status === "succeeded") {
            throw new StripePaymentException(
                ErrorMessages::STRIPE_PAYMENT_ERROR, Response::HTTP_NOT_ACCEPTABLE
            );
        }

        return $charge;
    }
}
