<?php

declare(strict_types=1);

namespace App\Repositories\Loans;

use App\Models\Loan;
use App\Repositories\Base\Repository;
use Illuminate\Pagination\LengthAwarePaginator;

class LoanRepository extends Repository
{
    public function model(): string
    {
        return Loan::class;
    }

    public function getByStatus(string $status, int $paginate): LengthAwarePaginator
    {
        return $this->newQuery()->where('status', '=', $status)->with('user')->paginate($paginate);
    }
}
