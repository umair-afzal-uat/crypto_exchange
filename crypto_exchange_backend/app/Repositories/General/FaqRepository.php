<?php

declare(strict_types=1);

namespace App\Repositories\General;

use App\Models\Faq;
use App\Repositories\Base\Repository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Collection;

class FaqRepository extends Repository
{
    public function model(): string
    {
        return Faq::class;
    }

}
