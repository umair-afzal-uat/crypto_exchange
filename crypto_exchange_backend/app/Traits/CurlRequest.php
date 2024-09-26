<?php

namespace App\Traits;

trait CurlRequest
{
    public function sendGetRequest($url)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_URL, $url);
        $output = curl_exec($curl);
        curl_close($curl);

        return $output;
    }

    public function sendPostRequest(
        string $url,
        array $data,
        array $headers = [
            'Content-Type: application/json',
            'Accept: application/json',
        ]
    ) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $output = curl_exec($ch);

        curl_close($ch);

        return $output;
    }
}
