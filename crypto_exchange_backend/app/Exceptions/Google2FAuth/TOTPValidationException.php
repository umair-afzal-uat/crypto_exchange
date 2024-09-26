<?php

namespace App\Exceptions\Google2FAuth;

use Illuminate\Http\Response;

class TOTPValidationException extends Google2FAServiceException
{
    protected $code = Response::HTTP_BAD_REQUEST;
}
