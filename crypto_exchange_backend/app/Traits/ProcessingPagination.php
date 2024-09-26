<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;

trait ProcessingPagination
{
    /**
     * @var int
     */
    protected $perPage = 15;

    /**
     * @var int
     */
    protected $currentPage = 1;

    /**
     * @var int
     */
    protected $skip = 0;

    /**
     * @var int
     */
    protected $total = 0;

    /**
     * @param Request $request
     */
    public function resolvePagination(Request $request): void
    {
        $this->skip = (int)$request->input('skip', 0);

        $this->currentPage = $this->skip > 0 ? 1 : (int)$request->input('page', 1);

        $this->perPage = (int)$request->input('per_page', 15);

        Paginator::currentPageResolver(function () {
            return $this->currentPage;
        });
    }

    /**
     * @param array $resource
     * @param string $name
     * @return array
     */
    protected function prettyPaginatedData(array $resource, string $name): array
    {
        $data = [];
        if($this->skip > 0){
            $data['skipped']        = $this->skip ?? 0;
        }else{
            $data['last_page']    = $resource['last_page'] ?? 0;
            $data['current_page'] = $resource['current_page'] ?? 0;
        }
        $data['per_page']     = $this->perPage;
        $data['total']        = $resource['total'] ?? $this->total;
        $data[$name]          = $resource['data'];

        return $data;
    }

    protected function getDataForResponse(Collection $collection): LengthAwarePaginator
    {
        return new LengthAwarePaginator(
            $collection->forPage($this->currentPage, $this->perPage)->values(),
            $collection->count(),
            $this->perPage,
            $this->currentPage
        );
    }

    /**
     * @param array $array
     * @param string $url
     * @return array|LengthAwarePaginator
     */
    protected function paginateArray(array $array, string $url)
    {
        $collection = collect($array);
        $paginatedItems = new LengthAwarePaginator(
            $collection->forPage($this->currentPage, $this->perPage)->values() ,
            $collection->count(),
            $this->perPage
        );
        $paginatedItems->setPath($url);

        return $paginatedItems;
    }

    protected function PrettyPaginatedFromQuery(Builder $query, string $name, bool $reverseOrder = false): array
    {
        if($this->skip > 0){
            $this->total = $query->count();
            $data = $query->skip($this->skip)->take($this->perPage)->get();
        }else{
            $data = $query->paginate($this->perPage);
        }

        $result = [];
        foreach ($data as $item){
            if($reverseOrder){
                array_unshift($result, $item->toArray());
            }else{
                $result[] = $item->toArray();
            }
        }

        $data = $data->toArray();
        $data['data'] = $result;

        return $this->prettyPaginatedData($data, $name);
    }
}
