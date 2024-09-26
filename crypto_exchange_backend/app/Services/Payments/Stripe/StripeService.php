<?php

namespace App\Services\Payments\Stripe;

use App\Exceptions\ErrorMessages;
use App\Exceptions\Payments\Stripe\StripePaymentException;
use App\Models\Asset;
use App\Models\Payment;
use App\Services\Payments\PaymentService;
use DB;
use Illuminate\Http\Response;
use Stripe\Charge;
use Stripe\Exception\ApiErrorException;
use Stripe\Exception\CardException;
use Stripe\Stripe;
use Stripe\StripeClient;

class StripeService extends BaseStripeService implements PaymentService
{
    public function __construct()
    {
        parent::__construct();
    }

    public function makePayment(Payment $payment, float $amount, string $currency, ?array $payerData = []): array
    {
        if (!isset($payerData['number'])) {
            throw new \DomainException('card_number_is_required');
        }

        if (!isset($payerData['exp_month'])) {
            throw new \DomainException('card_exp_month_is_required');
        }

        if (!isset($payerData['exp_year'])) {
            throw new \DomainException('card_exp_year_is_required');
        }

        if (!isset($payerData['cvc'])) {
            throw new \DomainException('card_cvc_is_required');
        }

        try {
            $token = $this->createCardToken($payerData);
            $data = $this->doCharge($amount, strtoupper(Asset::USD), $token, Asset::BTC);
        } catch (StripePaymentException $e) {
            $payment->setCanceled();
            throw new \DomainException($e->getMessage());
        }

        $payment->setComplited();

        $response = [
            'payment' => $payment,
            'amount' => $data->amount,
            'currency' => $data->currency
        ];

        return $response;
    }
}
