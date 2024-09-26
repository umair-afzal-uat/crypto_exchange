<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class LoginConfirmation extends Model
{
    protected $table = 'login_confirmations';

    protected $fillable = [
        'code',
        'expiration'
    ];

    public function confirmable(): MorphTo
    {
        return $this->morphTo('confirmable');
    }
}
