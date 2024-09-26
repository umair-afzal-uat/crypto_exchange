<?php

namespace App\Services;

use App\Models\Asset;
use App\Traits\CurlRequest;
use App\Traits\FormatsAmount;
use Illuminate\Support\Facades\Redis;

class AssetService
{
    use CurlRequest, FormatsAmount;

    private $redis;

    public function __construct()
    {
        $this->redis = Redis::connection();
        $this->redis->select(config('custom.main_redis_db', 1));
    }

    public function getAssetsList(): string
    {
        $assetsCodes = Asset::pluck('code');

        $assetsList = '';
        foreach ($assetsCodes as $assetCode) {
            $assetsList .= strtoupper($assetCode) . ',';
        }

        return trim($assetsList, ',');
    }

    public function getAssetPairRawDataWithApiKey(string $baseAssetCode, string $quoteAssetCode)
    {
        $key = config('custom.cryptocompare_api_key');

        return $this->sendGetRequest('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' . $baseAssetCode . '&tsyms=' . $quoteAssetCode . '&api_key=' . $key);
        // return $this->sendGetRequest('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?fsyms=' . $baseAssetCode . '&tsyms=' . $quoteAssetCode . '&api_key=' . $key);
    }

    public function getAssetsListPartial(): array
    {
        $assetsCodes = Asset::pluck('code')->toArray();

        return array_chunk($assetsCodes, 22);
    }

    public function getActiveAssets(): array
    {
        return Asset::active()->get()->toArray();
    }
}
