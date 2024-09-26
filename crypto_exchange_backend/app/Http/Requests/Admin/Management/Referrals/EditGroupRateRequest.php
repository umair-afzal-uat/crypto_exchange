<?php

namespace App\Http\Requests\Admin\Management\Referrals;

use App\Services\Base\BaseAppGuards;
use Illuminate\Foundation\Http\FormRequest;

class EditGroupRateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function authorize()
    {
        return auth()->guard(BaseAppGuards::ADMIN)->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'group_id' => ['integer', 'exists:referral_groups,id', 'required'],
            'rate' => ['numeric', 'gt:0', 'max:30', 'required']
        ];
    }
}
