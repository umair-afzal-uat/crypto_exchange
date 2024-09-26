<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use App\Services\Google2FAService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class Google2FAController
 *
 * @package App\Http\Controllers\Carrier\Auth
 */
class Google2FAController extends Controller
{
    /**
     * @var \App\Services\Google2FAService
     */
    private $service;

    /**
     * Google2FAController constructor.
     *
     * @param  \App\Services\Google2FAService  $service
     */
    public function __construct(Google2FAService $service)
    {
        $this->service = $service;
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function generateSecretKey(): Response
    {
        return response($this->service->generateSecretKey(auth()->user()), Response::HTTP_CREATED);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Response
     * @throws \App\Exceptions\ApplicationException
     * @throws \App\Exceptions\Google2FAuth\InvalidSecretKeyException
     * @throws \App\Exceptions\Google2FAuth\TOTPValidationException
     */
    public function enable2FA(Request $request): Response
    {
        $request->validate(
            [
                'totp' => [
                    'required',
                    'string',
                ],
            ]
        );

        $this->service->enable2FA(auth()->user(), $request->totp);

        return response()->noContent(Response::HTTP_ACCEPTED);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Response
     * @throws \App\Exceptions\ApplicationException
     * @throws \App\Exceptions\Google2FAuth\InvalidSecretKeyException
     * @throws \App\Exceptions\Google2FAuth\TOTPValidationException
     */
    public function disable2FA(Request $request): Response
    {
        $request->validate(
            [
                'totp' => [
                    'required',
                    'string',
                ],
            ]
        );
        $this->service->disable2FA(auth()->user(), $request->totp);

        return response()->noContent(Response::HTTP_ACCEPTED);
    }
}
