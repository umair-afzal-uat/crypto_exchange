<?php

namespace App\Exceptions\Google2FAuth;

use Illuminate\Http\Response;

class InvalidSecretKeyException extends Google2FAServiceException
{
    protected $message = 'invalid_secret_key';
    protected $code = Response::HTTP_BAD_REQUEST;
}
