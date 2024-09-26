<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fill extends Model
{
    protected $table = 'fills';

    protected $fillable = [
        'amount_usd',
        'payment_id',
        'loan_period_id'
    ];

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function loanPeriod()
    {
        return $this->hasOne(LoanPeriod::class);
    }
}
