<?php

namespace App\Services;

use App\Repositories\Loans\LoanPeriodSettingsRepository;
use App\Traits\FormatsAmount;
use Illuminate\Support\Collection;

class LoanPeriodSettingsService extends LoanPeriodSettingsRepository
{
    use FormatsAmount;

    /**
     * @param array  $data
     * @param int    $id
     * @param string $attribute
     *
     * @return \Illuminate\Support\Collection
     */
    public function updatePeriod(array $data, int $id, string $attribute = "id")
    {
        $period = $this->findOrFail($id);

        $period->update($data);

        return $period->fresh();
    }
}
