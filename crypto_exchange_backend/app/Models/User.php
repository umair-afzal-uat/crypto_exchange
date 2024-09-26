<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class User
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $country
 * @property string $company
 * @property string $phone
 * @property string $status
 * @property bool $email_confirmed
 * @property string $password
 * @property string $remember_token
 * @property string $created_at
 * @property string $updated_at
 *
 * @package App\Models
 */
class User extends Authenticatable implements JWTSubject, BaseUsersModelInterface, Google2FAInterface, Searchable
{
    use Notifiable, SoftDeletes;

    /**
     * Base user status
     */
    public const UNVERIFIED_STATUS = 'UNVERIFIED';

    public const VERIFIED_STATUS = 'VERIFIED';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'status',
        'invite_key',
        'date_birth',
        'address',
        'last_login',
        'last_login_confirmation',
        'referral_group_id',
        'blocked',
        'social_security_number',
        'debit_card_number',
        'debit_card_expiry_date',
        'debit_card_sec_number',
        'btc_address',
        'state',
        'city',
        'zip'

    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google2fa_secret',
        'last_login_confirmation',
        'last_login',
        'email_verified_at',
        'deleted_at',
    ];

    protected $with = ['wallet'];

    /* Relations */

    public function account()
    {
        return $this->hasOne(Account::class, 'id');
    }

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


    /* Scopes */

    /**
     * Scope a query to filter date.
     *
     * @param  Builder  $query
     *
     * @param  string  $search
     *
     * @return Builder
     */
    public function scopeSearch(Builder $query, string $search = null): Builder
    {
        if (isset($search)) {
            $query->where('email', 'LIKE', "%$search%");
        }

        return $query;
    }

    public function enable2FA(): void
    {
        $this->attributes['google2fa_enabled'] = true;
        $this->save();
    }

    public function disable2FA(): void
    {
        $this->attributes['google2fa_secret'] = null;
        $this->attributes['google2fa_enabled'] = false;
        $this->save();
    }

    public function confirmations(): MorphMany
    {
        return $this->morphMany(LoginConfirmation::class, 'confirmable');
    }

    public function wallet()
    {
        return $this->hasOne(Wallet::class, 'user_id', 'id');
    }

    public function loan()
    {
        return $this->hasMany(Loan::class, 'user_id', 'id');
    }

    public function firstLoan()
    {
        return $this->hasOne(Loan::class, 'user_id', 'id')->orderBy('id', 'asc');
    }

    public function referralPayment()
    {
        return $this->hasOne(ReferralPayment::class, 'referral_user_id', 'id');
    }

    public function referralGroup()
    {
        return $this->hasOne(ReferralGroup::class, 'id', 'referral_group_id');
    }

    public function getSearchResult(): SearchResult
    {
        return new \Spatie\Searchable\SearchResult(
            $this,
            $this->first_name
        );
    }

    public function getSearchFields(): array
    {
        return ['first_name', 'last_name'];
    }
}
