<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Mail\User\Auth\PasswordResetMail;
use Illuminate\Support\Facades\Hash;
use Mail, Str;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\EmailRequest;
use App\Models\{PasswordReset, User};
use Illuminate\Http\Response;

class ForgotPasswordController extends Controller
{
    /**
     * Send a reset link to the given user.
     *
     * @param EmailRequest $request
     *
     * @return Response
     */
    public function requestResetPassword(EmailRequest $request): Response
    {
        $user = User::where('email', $request->email)->first();

        if (empty($user)) {
            return response(['error' => 'User is not found'], Response::HTTP_BAD_REQUEST);
        }

        if (!$user->email_confirmed) {
            return response(['error' => 'Email not confirmed'], Response::HTTP_BAD_REQUEST);
        }

        if ($user) {
            $token = Str::random(96);

            $password_reset = PasswordReset::firstOrNew(['email' => $request->email]);
            $password_reset->token = $token;
            $password_reset->created_at = Carbon::now();
            $password_reset->save();

            Mail::to($user->email)->send(new PasswordResetMail($token, $user->first_name . ' ' . $user->last_name));

            return response(
                config('app.debug') ? ['password_reset_token' => $token] : null,
                201
            );
        }
        return response(['error' => 'We can\'t find a user with that e-mail address.'], Response::HTTP_BAD_REQUEST);
    }

    public function resetPassword(ResetPasswordRequest $request): Response
    {
        $resetPassword = PasswordReset::where('token', $request->token)->first();
        $user = User::query()->where('email', $resetPassword->email)->firstOrFail();
        $user->update(['password' => Hash::make($request->password)]);

        $user->disable2FA();
        $resetPassword->delete();

        return response()->noContent();
    }
}
