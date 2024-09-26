<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReferralGroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $groups = [
            ['rate' => 7],
        ];

        DB::table('referral_groups')->delete();
        DB::table('referral_groups')->insert($groups);
    }
}

