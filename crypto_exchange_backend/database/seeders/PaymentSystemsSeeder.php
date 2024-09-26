<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentSystemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $paymentSystems = [
            ['id' => 1, 'name' => 'Stripe',        'code' => 'stripe'        ,'sale' => 8 ],
            ['id' => 2, 'name' => 'Plisio',        'code' => 'plisio'        ,'sale' => 40],
            ['id' => 3, 'name' => 'Cash app',      'code' => 'cash_app'      ,'sale' => 10],
            ['id' => 4, 'name' => 'Zelle',         'code' => 'zelle'         ,'sale' => 0 ],
            ['id' => 5, 'name' => 'Bank transfer', 'code' => 'bank_transfer' ,'sale' => 0 ],
        ];

        DB::table('payment_systems')->delete();
        DB::table('payment_systems')->insert($paymentSystems);
    }
}

