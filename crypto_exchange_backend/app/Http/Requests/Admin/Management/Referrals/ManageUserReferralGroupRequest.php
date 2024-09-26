<?php

namespace App\Http\Requests\Admin\Management\Referrals;

use App\Services\Base\BaseAppGuards;
use Illuminate\Foundation\Http\FormRequest;

class ManageUserReferralGroupRequest extends FormRequest
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
            'user_id' => ['required', 'int', 'exists:users,id'],
            'group_id' => ['nullable', 'int', 'exists:referral_groups,id']
        ];
    }
}
