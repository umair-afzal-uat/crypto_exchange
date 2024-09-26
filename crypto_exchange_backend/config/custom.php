<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Delays for pusher events, commands
    |--------------------------------------------------------------------------
    */

    'cryptocompare_api_key' => env('CRYPTOCOMPARE_API_KEY', ''),
    'main_redis_db'         => env('MAIN_REDIS_DB', 1),
    'notification' => [
        'email' => 'info@crypto.exchange'
    ],

    'delays' => [
        'assets_pairs_prices' => env('COMMAND_ASSETS_PAIR_PRICES_IN_S', 60),
    ],

    'precisions' => [
        'fiat_precision'   => env('FIAT_PRECISION', 2),
        'crypto_precision' => env('CRYPTO_PRECISION', 8),
    ],
];

