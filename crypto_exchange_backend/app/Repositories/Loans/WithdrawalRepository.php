<?php

declare(strict_types=1);

namespace App\Repositories\Loans;

use App\Models\WithdrawalRequest;
use App\Repositories\Base\Repository;
use Illuminate\Database\Eloquent\Model;

class WithdrawalRepository extends Repository
{
    public function model(): string
    {
        return WithdrawalRequest::class;
    }

}
