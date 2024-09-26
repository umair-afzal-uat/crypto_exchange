<?php

namespace App\Services\Payments\Manual;

use App\Models\Payment;
use App\Services\Payments\PaymentService;

class ManualService implements PaymentService
{
    public function makePayment(Payment $payment, float $amount, string $currency, ?array $payerData = []): array
    {
        return [
            'payment' => $payment->setWaitingAdmin(),
            'auto_approve' => false,
        ];
    }
}
