<?php

namespace App\Exceptions\Google2FAuth;

use Illuminate\Http\Response;

class SecretGenerationException extends Google2FAServiceException
{
    protected $code = Response::HTTP_INTERNAL_SERVER_ERROR;
}
