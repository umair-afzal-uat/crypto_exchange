<?php

declare(strict_types=1);

namespace App\Services;

use App\Exceptions\ApplicationException;
use App\Exceptions\Google2FAuth\InvalidSecretKeyException;
use App\Exceptions\Google2FAuth\SecretGenerationException;
use App\Models\BaseUsersModelInterface;
use App\Models\Google2FAInterface;
use Illuminate\Database\Eloquent\Model;
use PragmaRX\Google2FA\Exceptions\Google2FAException;
use PragmaRX\Google2FAQRCode\Google2FA;

abstract class AbstractGoogle2FAService
{
    /**
     * @var Google2FA
     */
    private $google2FA;

    public function __construct()
    {
        $this->google2FA = new Google2FA();
    }

    /**
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return string
     * @throws \App\Exceptions\ApplicationException
     * @throws \App\Exceptions\Google2FAuth\SecretGenerationException
     */
    protected function generateSecret(Model $model): string
    {
        if ($model instanceof BaseUsersModelInterface && $model instanceof Google2FAInterface) {
            try {
                return $this->google2FA->generateSecretKey($model::SECRET_KEY_LENGTH);
            } catch (Google2FAException $e) {
                throw new SecretGenerationException($e->getMessage());
            }
        } else {
            throw new ApplicationException(
                "Invalid base service model class, model must be implementing BaseUsersModelInterface"
            );
        }
    }

    protected function getQRCodeInline($company, $holder, $secret, $size = 200, $encoding = 'utf-8'): string
    {
        return $this->google2FA->getQRCodeInline($company, $holder, $secret, $size, $encoding);
    }

    /**
     * @param  string  $totp
     * @param  \Illuminate\Database\Eloquent\Model  $user
     * @return bool
     * @throws \App\Exceptions\Google2FAuth\InvalidSecretKeyException
     */
    protected function verify(string $totp, Model $user): bool
    {
        try {
            if (!(new Google2FA())->verify($totp, $user->google2fa_secret ?? null)) {
                return false;
            }

        } catch (Google2FAException $e) {
            throw new InvalidSecretKeyException($e->getMessage());
        }

        return true;
    }
}
