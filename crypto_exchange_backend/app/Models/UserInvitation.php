<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserInvitation extends Model
{
    public const STATUS_SENT      = 'sent';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_PENDING   = 'pending';
    public const STATUS_EXPIRED   = 'expired';

    protected $fillable = [
        'user_id',
        'email',
        'status',
        'created_at'
    ];

    public function scopeCompleted($query)
    {
        return $query->where('status', self::STATUS_COMPLETED);
    }

    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    public function scopeSent($query)
    {
        return $query->where('status', self::STATUS_SENT);
    }
}
