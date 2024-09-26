<?php

namespace App\Exceptions\Payments\Stripe;

use Illuminate\Http\Response;

class StripePaymentException extends \Exception
{
    protected $code = Response::HTTP_PAYMENT_REQUIRED;
}
