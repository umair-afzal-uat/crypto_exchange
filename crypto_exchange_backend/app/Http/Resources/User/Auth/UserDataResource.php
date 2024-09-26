<?php

namespace App\Http\Resources\User\Auth;

use Illuminate\Http\Resources\Json\JsonResource;

class UserDataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id'                                => $this->id,
            'first_name'                        => $this->first_name,
            'last_name'                         => $this->last_name,
            'email'                             => $this->email,
            'phone'                             => $this->phone,
            'invite_key'                        => $this->invite_key,
            'address'                           => $this->address,
            'date_birth'                        => $this->phone,
            "last_login"                        => $this->last_login,
        ];
    }
}
