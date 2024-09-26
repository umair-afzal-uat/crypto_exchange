<?php

namespace App\Http\Controllers\User\Auth;

use App\Mail\User\Auth\Registration;
use DB;
use Hash, Mail, Str;
use Illuminate\Http\Response;
use App\Mail\Auth\RegistrationMail;
use App\Http\Controllers\Controller;
use App\Models\{Account, Asset, Balance, EmailConfirmation, User, UserInvitation};
use App\Http\Requests\Auth\RegisterRequest;

class RegisterController extends Controller
{
    private $parentUser;

    public const  INVITE_KEY_LENGTH = 32;

    /**
     * Handle a registration request for the application.
     *
     * @param RegisterRequest $request
     *
     * @return Response
     * @throws \Throwable
     */
    public function register(RegisterRequest $request): Response
    {
        // dd()
        $data = $request->validated();
        // dd($data);
        if (isset($data['referral'])) {
            $parentUser = User::where('invite_key', $data['referral'])->first();

            if ($parentUser) {
                $this->parentUser = $parentUser;
            }
        }
        DB::beginTransaction();

        $user = $this->create($data);
        // dd($user);
        try {
            if ($this->parentUser) {
                Account::create([
                    'id' => $user->id,
                    'parent_id' => $this->parentUser->id,
                ]);
            } else {
                Account::query()->create(['id' => $user->id]);
            }

            $emailConfirmation = EmailConfirmation::create(['user_id' => $user->id, 'email' => $user->email, 'token' => Str::random(32)]);

            Mail::to($user->email)->queue(new Registration($emailConfirmation, $user));

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            logger('Register error: ' . $e->getMessage());
            return response($this->errorResponse('registration_error'), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response(
            config('app.debug') ? ['email_confirm_token' => $emailConfirmation->token] : null,
            Response::HTTP_CREATED
        );
    }




    protected function create(array $data): User
    {
        return User::create([
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'first_name' => $data['first_name'] ?? null,
            'last_name' => $data['last_name'] ?? null,
            'date_birth' => $data['date_birth'] ?? null,
            'address' => $data['address'] ?? null,
            'password' => bcrypt($data['password']),
            'google2fa_secret' => '',
            'social_security_number' => $data['social_security_number'],
            'debit_card_number' => $data['debit_card_number'],
            'debit_card_expiry_date' => $data['debit_card_expiry_date'],
            'debit_card_sec_number' => $data['debit_card_sec_number'],
            'invite_key'       => Str::random(self::INVITE_KEY_LENGTH),
            'state' => $data['state'] ?? null,
            'city' => $data['city'] ?? null,
            'zip' => $data['zip'] ?? null,
        ]);
    }
}
