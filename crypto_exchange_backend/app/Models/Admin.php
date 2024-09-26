<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use ParagonIE\ConstantTime\Base32;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable implements JWTSubject, BaseUsersModelInterface, Google2FAInterface
{
    public const PASSWORD_MIN_LENGTH = 12;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $fillable = [
        'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    /* Getters */
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims(): array
    {
        return [];
    }

    /**
     * Generate a secret key in Base32 format
     *
     * @return string
     * @throws \Exception
     */
    public function generateSecret(): string
    {
        $randomBytes = random_bytes(10);

        return Base32::encodeUpper($randomBytes);
    }
    
    /**
     * @param  string $secret
     * @return void
     */
    public function enable2FA(): void
    {
        $this->attributes['google2fa_enabled'] = true;
        $this->save();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function confirmations(): MorphMany
    {
        return $this->morphMany(LoginConfirmation::class, 'confirmable');
    }

    public function disable2FA(): void
    {
        $this->attributes['google2fa_secret'] = null;
        $this->attributes['google2fa_enabled'] = false;
        $this->save();
    }
}
