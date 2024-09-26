<?php

namespace App\Services\Payments\Plisio;

class BasePlisioService
{
    private const BASE_URL = "https://plisio.net/api/v1";

    private const CREATE_INVOICE_FIELDS = [
        'source_currency',
        'source_amount',
        'order_number',
        'currency',
        'email',
        'order_name',
    ];

    private string $secret;
    private string $callbackUrl;

    public function __construct()
    {
        $this->secret = config('services.plisio.secret');
        $this->callbackUrl = config('services.plisio.callback_url');
    }

    public function createInvoice(array $data): array
    {
        $dataKeys = array_keys($data);
        foreach (self::CREATE_INVOICE_FIELDS as $key) {
            if (!in_array($key, $dataKeys)) {
                throw new \DomainException($key . '_is_required');
            }
        }

        $response = $this->sendRequest('invoices/new', $data);
        // dd( $this);
        // dd( $response);
        if ($response['status'] === 'error') {
            $message = $response['data']['message'];
            throw new \DomainException($message);
        }

        return $this->sendRequest('invoices/new', $data);
    }

    public function verifyCallbackData (array $post) : bool
    {
        if (!isset($post['verify_hash'])) {
            return false;
        }

        $verifyHash = $post['verify_hash'];

        unset($post['verify_hash']);

        ksort($post);

        $postString = serialize($post);
        $checkKey = hash_hmac('sha1', $postString, $this->secret);

        return !($checkKey != $verifyHash);
    }

    private function sendRequest(string $method, ?array $data = null): array
    {
        $ch = curl_init();
        $url = self::BASE_URL . '/' . $method;

        $data['api_key'] = $this->secret;
        $data['callback_url'] = $this->callbackUrl;

        if (!is_null($data)) {
            $url .= '?' . http_build_query($data);
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);

        return json_decode(curl_exec($ch), 1);
    }
}
