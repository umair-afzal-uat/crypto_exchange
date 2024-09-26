<?php


namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait SaveCronError
{
    public function saveError($file, $error, int $assetId = null): void
    {
        DB::table('cron_statuses')->insert([
            'status'  => 'fail',
            'asset_id'=> $assetId,
            'command' => $file,
            'file'    => $error->getFile(),
            'line'    => $error->getLine(),
            'message' => $error->getMessage(),
            'created_at' => date('Y-m-d H:i:s')
        ]);
    }
}