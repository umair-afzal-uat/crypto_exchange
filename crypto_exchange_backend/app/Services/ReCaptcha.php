<?php


namespace App\Services;

use GuzzleHttp\Client;

class ReCaptcha
{
    public function validate($attribute, $value, $parameters, $validator)
    {
        $client = new Client();

        if (config('app.debug') && $value == '000000') {
            return true;
        }

        $response = $client->post(
            'https://www.google.com/recaptcha/api/siteverify',
            ['form_params'=>
                [
                    'secret'=>env('GOOGLE_RECAPTCHA_SECRET'),
                    'response'=>$value
                ]
            ]
        );

        return json_decode((string)$response->getBody())->success;
    }
}