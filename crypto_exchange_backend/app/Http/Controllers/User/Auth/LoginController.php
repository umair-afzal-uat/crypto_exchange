<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginConfirmationRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\User\Auth\UserDataResource;
use App\Models\User;
use App\Services\Google2FAService;
use App\Services\UserService;
use Hash;
use JWTAuth;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    /**
     * @return void
     */

    private UserService $service;

    public function __construct()
    {
        $this->middleware('guest')->except(['logout', 'tokenRefresh']);
        $this->service = resolve(UserService::class);
    }

    public function login(LoginRequest $request): Response
    {
        $data = $request->validated();

        if (config('app.debug') === true && $request->captcha === '000000') {
            unset($data['captcha']);
        }

        ['token' => $token, 'user_data' => $userData] = $this->service->authWithTOTP(
            $data['email'],
            $data['password'],
            $data['totp'] ?? '',
            'email',
            $data['remember'] ?? false
        );

        $userData = new UserDataResource($userData);

        return response(compact('token', 'userData'), Response::HTTP_OK);
    }

    public function confirmLogin(LoginConfirmationRequest $request)
    {
        $this->service->confirmLogin($request->code);

        return response()->noContent();
    }

    /**
     * @return Response
     */
    public function tokenRefresh(): Response
    {
        if (! $token = JWTAuth::getToken()) {
            return response(['error' => 'Token not provided'], Response::HTTP_BAD_REQUEST);
        }

        try {
            $newToken = JWTAuth::setToken($token)->refresh();
            $user     = JWTAuth::setToken($newToken)->authenticate();
            if ($user) {
                return response(['token' => $newToken], Response::HTTP_ACCEPTED);
            }

            return response(['error' => 'Token expired'], Response::HTTP_UNAUTHORIZED);
        } catch (JWTException $e) {
            return response(['error' => 'Token invalid'], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Log the user out of the application.
     *
     * @return Response
     */
    public function logout(): Response
    {
        auth()->logout();

        return response()->noContent();
    }
}
