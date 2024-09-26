<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailConfirmation extends Model
{
    protected $fillable = [
        'email', 'token', 'user_id', 'is_change'
    ];
}
