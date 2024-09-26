<?php

declare(strict_types=1);

namespace App\Repositories\Loans;

use App\Models\LoanMainSettings;
use App\Models\LoanPeriodSetting;
use App\Repositories\Base\Repository;

class LoanPeriodSettingsRepository extends Repository
{
    public function model(): string
    {
        return LoanPeriodSetting::class;
    }

    public function getDownPayment(): float
    {
        return LoanMainSettings::first()->down_payment;
    }
}
