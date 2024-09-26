<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentSystemsRequisitesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $paymentSystemsAssets = [
            ['payment_system_id' =>  1, 'asset_id' => 5 ],
            ['payment_system_id' =>  3, 'asset_id' => 5 ],
            ['payment_system_id' =>  4, 'asset_id' => 5 ],
            ['payment_system_id' =>  5, 'asset_id' => 5 ],
            ['payment_system_id' =>  2, 'asset_id' => 1 ],
            ['payment_system_id' =>  2, 'asset_id' => 2 ],
            ['payment_system_id' =>  2, 'asset_id' => 7 ],
            ['payment_system_id' =>  2, 'asset_id' => 9 ],
            ['payment_system_id' =>  2, 'asset_id' => 10],
            ['payment_system_id' =>  2, 'asset_id' => 11],
            ['payment_system_id' =>  2, 'asset_id' => 12],
            ['payment_system_id' =>  2, 'asset_id' => 13],
            ['payment_system_id' =>  2, 'asset_id' => 14],
        ];

        DB::table('payment_systems_assets')->delete();
        DB::table('payment_systems_assets')->insert($paymentSystemsAssets);
    }
}

