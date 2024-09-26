<?php

namespace App\Traits;

use DB;

trait ConfirmationsCodes
{
    public function getCode(): int
    {
        return random_int(100000, 999999);
    }

    public function getUniqueCode(string $table, string $field): int
    {
        do {
            $code = strtoupper(random_int(100000, 999999));
        } while (DB::table($table)->where($field, $code)->exists());

        return $code;
    }

    public function getUniqueToken(string $table, string $field): string
    {
        do {
            $code = $this->getCode();
        } while (DB::table($table)->where($field, $code)->exists());

        return $code;
    }
}
