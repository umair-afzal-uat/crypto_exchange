<?php

namespace App\Services\Payments;

use App\Services\Payments\Manual\ManualService;
use App\Services\Payments\Plisio\PlisioService;
use App\Services\Payments\Stripe\StripeService;
use DomainException;
use Illuminate\Support\Facades\App;

class PaymentServiceResolver
{

    private $services = [
        'stripe'        => StripeService::class,
        'plisio'        => PlisioService::class,
        'cash_app'      => ManualService::class,
        'zelle'         => ManualService::class,
        'bank_transfer' => ManualService::class,
    ];

    public function createService($paymentSystem)
    {

        if (array_key_exists($paymentSystem, $this->services)) {
            $serviceCLASS = $this->services[$paymentSystem];

            return App::make($serviceCLASS);
        }

        throw new DomainException('unknown_service_name');
    }
}
