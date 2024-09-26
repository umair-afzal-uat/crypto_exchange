<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoanQueue extends Model
{
    public const STATUS_PENDING    = 'pending';
    public const STATUS_APPROVED   = 'approved';
    public const STATUS_REJECTED   = 'rejected';

    public const STATUSES = [
        self::STATUS_PENDING,
        self::STATUS_APPROVED,
        self::STATUS_REJECTED
    ];

    protected $table = 'loan_queue';

    protected $fillable = [
        'user_id',
        'loan_period_id',
        'rate',
        'loan_in_btc',
        'loaned_in_usd',
        'no_of_weeks',
        'weekly_payment',
        'down_payment',
        'status',
        'message'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
