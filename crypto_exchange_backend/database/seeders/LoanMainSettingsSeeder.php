<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LoanMainSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = [
            [
                'down_payment' => 20,
                'max_loans_amount_usd' => 5000,
                'referral_rate' => 5,
                'min_loan_amount_usd' => 1000,
                'origination_fee_usd' => 10,
                'loan_queued' => true,
                'min_withdraw' => '0.000133000'
            ],
        ];

        DB::table('loan_main_settings')->delete();
        DB::table('loan_main_settings')->insert($settings);
    }
}

