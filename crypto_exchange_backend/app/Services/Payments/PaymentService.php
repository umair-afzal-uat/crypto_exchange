<?php

namespace App\Services\Payments;

use App\Models\Payment;

interface PaymentService
{
    public function makePayment(Payment $payment, float $amount, string $currency, ?array $payerData = []): array;

//    public function checkPayment(array $data): bool;
}
