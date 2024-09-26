<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'stripe' => [
        'secret' => env('STRIPE_SECRET')
    ],

    'plisio' => [
        // 'secret' => env('PLISIO_SECRET', 'NEdeIQVjCy7tmW5Y9CVCwl4dtZARApnxSgbk6mdVMI51SC82lSaAPuQtmMINWjtA'),
        //'secret' => env('PLISIO_SECRET', 'Bzyem4oxvk-9yBnHhw508pxkBHyCKDAiBB18GaQXz_dTma32KWon0zIAJN4j367_'),
        //'secret' => env('PLISIO_SECRET', '2W9wN-Uu7UbJqTnZoaXpcp7MrgIPZohMt0VYzMPxcNoQ9uFRbi3rEs78SKetoEuf'),
        'secret' => env('PLISIO_SECRET', 'HKYcOHpjC1KWcYb3lnBcAohAScHS4dBhPNsABVSWCbBAYbY__TZzgDlaJbMQIJBR'),
        'callback_url' => env('PLISIO_CALLBACK_URL', config('app.domain') . 'api/user/payment/plisio/callback')
    ]

];
