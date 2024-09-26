<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReferralGroup extends Model
{
    protected $table = 'referral_groups';

    protected $fillable = [
        'rate',
    ];

    public function user()
    {
        return $this->hasMany(User::class, 'referral_group_id', 'id');
    }
}
