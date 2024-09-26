<?php

namespace App\Console\Commands;

use App\Services\AssetService;
use App\Traits\CurlRequest;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class AssetsPairPrice extends Command
{
    use CurlRequest;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get:prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get price data for assets pairs from external api';

    /**
     * @var AssetService
     */
    private $assetService;

    /**
     * Create a new command instance.
     *
     * @param AssetService $assetService
     */
    public function __construct(AssetService $assetService)
    {
        parent::__construct();
        $this->assetService = $assetService;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $redis = Redis::connection();
        $redis->select(config('custom.main_redis_db', 1));

        $delay = config('custom.delays.assets_pairs_prices');

        // while (true) {
            $dataFull = [];
            $assetsListFull = $this->assetService->getAssetsList();
            $assetsListFullPartial = $this->assetService->getAssetsListPartial();

            foreach ($assetsListFullPartial as $key => $partial) {
                $assets = strtoupper(implode(',', $partial));
                //dd($assetsListFull, $assets);
                $data = json_decode($this->assetService->getAssetPairRawDataWithApiKey($assetsListFull, $assets), 1);
                if(isset($data["RAW"])){
                    $dataFull = array_merge_recursive($dataFull, $data ?? []);
                }
            }
            if(count($dataFull)){
                $redis->set('success_assets_data', serialize(date('Y-m-d H:i:s')));
                $redis->set('assets_pair_MAINDATA_FULL', json_encode($dataFull));
                \DB::table('test_log')->insert(
                    ['data' => json_encode([]), 'created_at' => time()]
                );
            }
            //print_r($redis->get('assets_pair_MAINDATA_FULL'));
        //     sleep($delay);
        // }
    }
}
