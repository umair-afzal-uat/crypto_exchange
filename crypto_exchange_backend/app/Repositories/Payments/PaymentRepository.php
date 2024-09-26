<?php

declare(strict_types=1);

namespace App\Repositories\Payments;

use App\Models\Admin;
use App\Models\Payment;
use App\Repositories\Base\Repository;
use Illuminate\Database\Eloquent\Model;

class PaymentRepository extends Repository
{
    public function model(): string
    {
        return Payment::class;
    }
}
