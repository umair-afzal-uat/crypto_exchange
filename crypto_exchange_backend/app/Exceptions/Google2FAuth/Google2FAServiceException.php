<?php

namespace App\Exceptions\Google2FAuth;

use Illuminate\Http\Response;

class Google2FAServiceException extends \DomainException
{
    protected $code = Response::HTTP_INTERNAL_SERVER_ERROR;
}
