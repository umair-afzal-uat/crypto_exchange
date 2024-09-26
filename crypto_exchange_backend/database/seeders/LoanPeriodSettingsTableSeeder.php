<?php

namespace Database\Seeders;

use App\Models\LoanPeriodSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LoanPeriodSettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $periods = [
            ['id' => 1,  'period' => 5,    'fee' => 20,     'no_of_payments' => 1   ],
            ['id' => 2,  'period' => 6,    'fee' => 20.5,   'no_of_payments' => 2   ],
            ['id' => 3,  'period' => 7,    'fee' => 21,     'no_of_payments' => 3   ],
            ['id' => 4,  'period' => 8,    'fee' => 21.5,   'no_of_payments' => 4   ],
            ['id' => 5,  'period' => 9,    'fee' => 22,     'no_of_payments' => 5   ],
            ['id' => 6,  'period' => 10,   'fee' => 22.5,   'no_of_payments' => 6   ],
            ['id' => 7,  'period' => 11,   'fee' => 23,     'no_of_payments' => 7   ],
            ['id' => 8,  'period' => 12,   'fee' => 23.5,   'no_of_payments' => 8   ],
            ['id' => 9,  'period' => 13,   'fee' => 24,     'no_of_payments' => 9   ],
            ['id' => 10, 'period' => 14,   'fee' => 24.5,   'no_of_payments' => 10  ],
            ['id' => 11, 'period' => 15,   'fee' => 25,     'no_of_payments' => 11  ],
            ['id' => 12, 'period' => 16,   'fee' => 25.5,   'no_of_payments' => 12  ]
        ];

        \DB::table('loan_period_settings')->delete();
        DB::table('loan_period_settings')->insert($periods);

    }
}

