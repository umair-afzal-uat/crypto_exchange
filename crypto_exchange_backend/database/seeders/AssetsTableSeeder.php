<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $assets = [
            ['id' => 1,  'code' => 'btc',    'active' => 1, 'type' => 'crypto',     'name'=> 'Bitcoin',             'link' => 'btc.png'   ],
            ['id' => 2,  'code' => 'ltc',    'active' => 1, 'type' => 'crypto',     'name'=> 'Litecoin',            'link' => 'ltc.png'   ],
            ['id' => 3,  'code' => 'xrp',    'active' => 0, 'type' => 'crypto',     'name'=> 'Ripple',              'link' => 'xrp.png'   ],
            ['id' => 4,  'code' => 'ada',    'active' => 0, 'type' => 'crypto',     'name'=> 'Cardano',             'link' => 'ada.png'   ],
            ['id' => 5,  'code' => 'usd',    'active' => 1, 'type' => 'fiat',       'name'=> 'United States Dollar','link' => 'dollar.png'],
            ['id' => 6,  'code' => 'eur',    'active' => 0, 'type' => 'fiat',       'name'=> 'Euro',                'link' => 'euro.png'  ],
            ['id' => 7,  'code' => 'eth',    'active' => 1, 'type' => 'crypto',     'name'=> 'Ethereum',            'link' => 'eth.png'   ],
            ['id' => 8,  'code' => 'bnb',    'active' => 0, 'type' => 'crypto',     'name'=> 'bnb',                 'link' => 'bnb.png'   ],
            ['id' => 9,  'code' => 'dash',   'active' => 1, 'type' => 'crypto',     'name'=> 'Dash',                'link' => 'dash.png'  ],
            ['id' => 10, 'code' => 'tzec',   'active' => 1, 'type' => 'crypto',     'name'=> 'Zcash',               'link' => 'tzec.png'  ],
            ['id' => 11, 'code' => 'doge',   'active' => 1, 'type' => 'crypto',     'name'=> 'Dogecoin',            'link' => 'doge.png'  ],
            ['id' => 12, 'code' => 'bch',    'active' => 1, 'type' => 'crypto',     'name'=> 'Bitcoin Cash',        'link' => 'bch.png'   ],
            ['id' => 13, 'code' => 'xmr',    'active' => 1, 'type' => 'crypto',     'name'=> 'Monero',              'link' => 'xmr.png'   ],
            ['id' => 14, 'code' => 'usdt',   'active' => 1, 'type' => 'crypto',     'name'=> 'Tether',              'link' => 'usdt.png'  ],
            ['id' => 15, 'code' => 'usdc',   'active' => 1, 'type' => 'crypto',     'name'=> 'USD Coin',            'link' => 'usdc.png'  ]
        ];

        DB::table('assets')->delete();
        DB::table('assets')->insert($assets);
    }
}

