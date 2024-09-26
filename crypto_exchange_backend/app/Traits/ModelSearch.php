<?php

namespace App\Traits;

use App;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class RelationsManager
 *
 * @package App\Traits
 */
trait ModelSearch
{
   public function multiSearch(string $modelName, array $searchData, Builder $query): Builder
   {
       try {
           $model = App::make($modelName);
           foreach ($searchData as $field => $value) {

               if($field === 'date') {
                   $from = Carbon::parse($value['value'])->startOfDay()->format('Y-m-d H:i:s');
                   $to = Carbon::parse($value['value_to'])->endOfDay()->format('Y-m-d H:i:s');
                   $query = $query->where('created_at', '>=', $from)->where('created_at', '<=', $to);
               } elseif (!is_null($field) && in_array($field, $model::SEARCH_FIELDS) && !is_null($value)) {
                   $query = $query->where($field, $value['value']);
               }
           }
       } catch (\Exception $e) {
           throw new \DomainException($e->getMessage());
       }

       return $query;
   }
}
