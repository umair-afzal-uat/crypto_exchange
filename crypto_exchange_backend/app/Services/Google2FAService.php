<?php

namespace App\Services;

use App\Enums\BaseAppEnum;
use App\Exceptions\Application\ApplicationException;
use App\Exceptions\Google2FAuth\Google2FAServiceException;
use App\Exceptions\Google2FAuth\TOTPValidationException;
use App\Models\Google2FAInterface;
use Illuminate\Database\Eloquent\Model;
use Mail;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

/**
 * Class Google2FAService
 *
 * @package App\Services
 */
class Google2FAService extends AbstractGoogle2FAService
{
    /**
     * Generate secret key
     *
     * @param \Illuminate\Database\Eloquent\Model $user
     *
     * @return array
     * @throws \App\Exceptions\ApplicationException
     * @throws \App\Exceptions\Google2FAuth\SecretGenerationException|\App\Exceptions\Application\ApplicationException
     */
    public function generateSecretKey(Model $user): array
    {
        return \DB::transaction(
            function () use ($user) {
                if (! ($user instanceof Google2FAInterface)) {
                    throw new \DomainException('Current model does not implemented Google2FAInterface');
                }

                if ($user->google2fa_enabled) {
                    throw new \DomainException('2fa_already_enabled');
                }

                $secret                 = $this->generateSecret($user);
                $user->google2fa_secret = $secret;
                $user->save();
                //generate image for QR barcode
                $imageDataUri = $this->getQRCodeInline(config('app.name'), $user->email, $secret, 200);

                return [
                    'QR_Image'         => $imageDataUri,
                    'secret'           => $secret,
                    'reauthenticating' => true,
                ];
            }, BaseAppEnum::TRANSACTION_ATTEMPTS
        );
    }

    /**
     * Enable 2FA for user
     *
     * @param \Illuminate\Database\Eloquent\Model $user
     * @param string                              $totp
     *
     * @return bool
     * @throws \App\Exceptions\ApplicationException
     * @throws \App\Exceptions\Google2FAuth\InvalidSecretKeyException
     * @throws \App\Exceptions\Google2FAuth\TOTPValidationException*@throws \App\Exceptions\Google2FAuth\Google2FAServiceException
     */
    public function enable2FA(Model $user, string $totp): bool
    {
        if (! ($user instanceof Google2FAInterface)) {
            throw new ApplicationException('Current model does not implemented Google2FAInterface');
        }

        if (is_null($user->google2fa_secret)) {
            throw new Google2FAServiceException('Generate token firstly');
        }

        if ($user->google2fa_enabled) {
            throw new TOTPValidationException('2fa_already_enabled');
        }

        if (! $this->verify($totp, $user)) {
            throw new TOTPValidationException('invalid_TOTP_code');
        }

        $user->enable2FA();

        //Mail::to($user->email)->queue(new Enabled2FA("{$user->first_name} {$user->last_name}"));

        return true;
    }

    /**
     * Disable 2FA for user
     *
     * @param \Illuminate\Database\Eloquent\Model $user
     * @param string                              $totp
     *
     * @return bool
     * @throws \App\Exceptions\ApplicationException
     * @throws \App\Exceptions\Google2FAuth\InvalidSecretKeyException
     * @throws \App\Exceptions\Google2FAuth\TOTPValidationException
     */
    public function disable2FA(Model $user, string $totp): bool
    {
        if (! ($user instanceof Google2FAInterface)) {
            throw new ApplicationException('Current model does not implemented Google2FAInterface');
        }

        if (! $user->google2fa_enabled) {
            throw new TOTPValidationException('2fa_already_disabled');
        }

        if (! $this->verify($totp, $user)) {
            throw new TOTPValidationException('invalid_TOTP_code');
        }

        $user->disable2FA();

        //Mail::to($user->email)->queue(new Disabled2FA("{$user->first_name} {$user->last_name}"));

        return true;
    }

    public function checkTOTP(Model $user, string $totp): void
    {
        if (! ($user instanceof Google2FAInterface)) {
            throw new ApplicationException('Current model does not implemented Google2FAInterface');
        }
        if ($user->google2fa_enabled) {
            if (! $this->verify($totp, $user)) {
                throw new TOTPValidationException('invalid_TOTP_code');
            }
        }
    }
}
