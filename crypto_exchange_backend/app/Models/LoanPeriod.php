<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoanPeriod extends Model
{
    protected $table = 'loan_periods';

    public const STATUS_OPENED    = 'opened';
    public const STATUS_PAID      = 'paid';
    public const STATUS_EXPIRED   = 'expired';
    public const STATUS_DEFFERED   = 'deffered';

    protected $fillable = [
        'loan_id',
        'amount_usd',
        'amount_usd_paid',
        'payment_date',
        'status',
        'down_period',
        'fee_period_amount',
    ];

    protected $visible = [
        'id',
        'loan_id',
        'amount_usd',
        'amount_usd_paid',
        'payment_date',
        'status',
        'down_period',
        'fee_period_amount',
    ];

    public function loan()
    {
        return $this->hasOne(Loan::class, 'id', 'loan_id');
    }

    public function fills()
    {
        return $this->hasMany(Fill::class, 'loan_period_id', 'id');
    }

    public function acceptPayment(float $amountUsd)
    {
        $this->amount_usd_paid += $amountUsd;
        $this->save();
        return $this->refresh();
    }

    public function setPaid()
    {
        $this->status = self::STATUS_PAID;
        $this->save();
        return $this->refresh();
    }

    public function setExpired()
    {
        $this->status = self::STATUS_EXPIRED;
        $this->save();
        return $this->refresh();
    }
}
