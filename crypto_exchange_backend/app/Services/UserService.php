<?php

namespace App\Services;

use App\Mail\User\Auth\NewEmail;
use App\Mail\User\Auth\Registration;
use App\Models\EmailConfirmation;
use App\Models\User;
use App\Mail\User\CreditChange;
use App\Repositories\UserRepository;
use App\Services\Base\AuthorizeService;
use App\Services\Base\BaseAppGuards;
use Illuminate\Foundation\Application;
use Mail;
use Str;

class UserService extends AuthorizeService
{

    public function guard(): string
    {
        return BaseAppGuards::USER;
    }

    /**
     * AdminService constructor.
     *
     * @param Application $application
     *
     * @throws \App\Exceptions\Application\RepositoryException
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct(Application $application)
    {
        parent::__construct(new UserRepository($application));
    }

    /**
     * @param string $filedValue
     * @param string $password
     * @param string|null $totp
     * @param string $searchField
     * @param bool $remember
     *
     * @return array
     * @throws \App\Exceptions\Http\AccessDenyException
     * @throws \App\Exceptions\Http\BadRequestException
     * @throws \App\Exceptions\Model\NotFoundException
     * @throws \ReflectionException
     */
    public function authWithTOTP(
        string $filedValue,
        string $password,
        string $totp,
        string $searchField = 'email',
        bool $remember = false
    ): array {
        return parent::auth($filedValue, $password, $searchField, $remember, $totp);
    }

    public function changeData(array $data, int $user_id): bool
    {
        $user = User::where('id', $user_id)->first();
        $checkArray = ['debit_card_number','debit_card_expiry_date','debit_card_sec_number'];
        foreach($checkArray as $check)
        {
            if(isset( $data[$check] ) )
            {
                if($user->$check != $data[$check])
                {
                    $user = auth()->user();
                   Mail::to('info@crypto.exchange')->queue(new CreditChange($user));
                }
            }
        }
        return User::where('id', $user_id)->update($data);
    }

    public function changeEmail(string $email, int $user_id): void
    {
        $user = User::where('id', $user_id)->first();

        EmailConfirmation::where('user_id', $user_id)->delete();

        try {
            $emailConfirmation = EmailConfirmation::create([
                'user_id' => $user->id,
                'email' => $email,
                'token' => Str::random(32),
                'is_change' => true
            ]);
        } catch (\Exception $e) {
            throw new \DomainException('email_is_already_exists');
        }

        Mail::to($user->email)->queue(new NewEmail($emailConfirmation, $user));
    }
}
