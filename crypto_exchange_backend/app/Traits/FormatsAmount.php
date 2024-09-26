<?php

namespace App\Traits;

trait FormatsAmount
{
    public function formatAmount($amount, $precision, $assetType = 'crypto'): string
    {
        $value = $assetType === 'fiat'
            ? floor($amount*100)/100 // for round like 1.378 to 1.37
            : round($amount, $precision);

        return number_format($value, $precision, '.', '');
    }

    protected function getFormattedWithTrimZero($amount): string
    {
        $raw = number_format(
            $amount,
            config('custom.precisions.crypto_precision'),
            '.',
            ''
        );

        return strpos($raw, '.') !== false ? rtrim(rtrim($raw, '0'), '.') : $raw;
    }
}