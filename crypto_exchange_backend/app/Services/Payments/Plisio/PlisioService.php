<?php

namespace App\Services\Payments\Plisio;

use App\Models\Asset;
use App\Models\Payment;
use App\Models\PaymentSystem;
use App\Services\LoanService;
use App\Services\Payments\PaymentService;
use Log;

class PlisioService extends BasePlisioService implements PaymentService
{
    public function makePayment(Payment $payment, float $amount, string $currency, ?array $payerData = []): array
    {
        // dd('d');
        $data = [
            'source_currency' => strtoupper(Asset::USD),
            'source_amount' => $amount,
            'order_number' => $payment->id,
            'currency' => strtoupper($currency),
            'email' => $payerData['email'] ?? '',
            'order_name' => 'Loan Payment',
            'allowed_psys_cids' => 'BTC,ETH,USDT,USDC'
        ];

        $data = $this->createInvoice($data);

        if ($data['status'] === 'success') {
            $payment->update(['refund_id' => $data['data']['txn_id'], 'status' => Payment::STATUS_WAITING_USER]);
            $response = [
                'payment' => $payment->fresh(),
                'url' => $data['data']['invoice_url'],
            ];
        } else {
            $response = [
                'payment' => $payment->setCanceled(),
            ];
        }

        return $response;
    }

    public function callbackListen($data): void
    {
        if ($this->verifyCallbackData($data) && $data['status'] === 'completed') {
            $paymentSystem = PaymentSystem::where('code', PaymentSystem::PAYMENT_SYSTEM_PLISIO)->first();
            $payment = Payment::where('refund_id', $data['txn_id'])
                ->where('payment_system_id', $paymentSystem->id)
                ->where('status', Payment::STATUS_WAITING_USER)
                ->firstOrFail();
            $payment->setComplited();

            resolve(LoanService::class)->fillPeriods($payment->id);
        }
    }
}
