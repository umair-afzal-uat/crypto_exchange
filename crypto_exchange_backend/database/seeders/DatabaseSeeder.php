<?php

namespace Database\Seeders;

use App\Models\PaymentSystem;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call(
            [
                ReferralGroupsSeeder::class,
                // DefaultUsersSeeder::class,
                AssetsTableSeeder::class,
                LoanMainSettingsSeeder::class,
                LoanPeriodSettingsTableSeeder::class,
                PaymentSystemsSeeder::class,
                PaymentSystemsAssetsSeeder::class
            ]
        );
    }
}
