<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    protected $table = 'loans';

    public const STATUS_INITIALIZED  = 'initialized';
    public const STATUS_ACTIVE       = 'active';
    public const STATUS_FINISHED     = 'finished';
    public const STATUS_EXPIRED      = 'closed';
    public const STATUS_WITH_DRAWALS = 'tobewithdrawals';

    public static array $statuses = [self::STATUS_ACTIVE, self::STATUS_EXPIRED, self::STATUS_FINISHED, self::STATUS_INITIALIZED];

    protected $fillable = [
        'user_id',
        'rate',
        'loaned_in_btc',
        'loaned_in_usd',
        'total_amount_usd',
        'fee',
        'status',
        'periods',
        'no_of_weeks',
        'weekly_payment',
        'down_payment'
    ];

    public function scopeActive($query)
    {
        // return $query->whereIn('status', [self::STATUS_INITIALIZED, self::STATUS_ACTIVE]);
        return $query->whereIn('status', [self::STATUS_INITIALIZED, self::STATUS_ACTIVE]);
    }

    public function scopeOld($query)
    {
        return $query->whereIn('status', [self::STATUS_FINISHED, self::STATUS_EXPIRED]);
    }

    public function loanPeriod()
    {
        return $this->hasMany(LoanPeriod::class, 'loan_id', 'id')->orderBy('id', 'asc');
    }

    public function lastLoanPeriod()
    {
        return $this->hasOne(LoanPeriod::class, 'loan_id', 'id')->orderBy('id', 'desc');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function payment()
    {
        return $this->hasMany(Payment::class, 'loan_id', 'id');
    }

    public function setActive()
    {
        $this->status = self::STATUS_ACTIVE;
        $this->save();
        return $this->refresh();
    }

    public function setFinished()
    {
        $this->status = self::STATUS_FINISHED;
        $this->save();
        return $this->refresh();
    }

    public function setWithDrawals()
    {
        $this->status = self::STATUS_WITH_DRAWALS;
        $this->save();
        return $this->refresh();
    }

    public function referralPayment()
    {
        return $this->hasOne(ReferralPayment::class, 'loan_id', 'id');
    }
}
