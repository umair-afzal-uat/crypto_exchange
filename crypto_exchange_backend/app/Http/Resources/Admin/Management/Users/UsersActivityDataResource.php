<?php

namespace App\Http\Resources\Admin\Management\Users;

use App\Enums\BaseAppEnum;
use Illuminate\Http\Resources\Json\JsonResource;

class UsersActivityDataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        $pagination = $request->input('pagination') ?? BaseAppEnum::DEFAULT_PAGINATION;

        return [
            'id'         => $this->id,
            'user_name'  => $this->user_name,
            'photo'      => $this->photo,
            'email'      => $this->email,
            'activities' => $this->activities()->paginate($pagination),
        ];
    }

}