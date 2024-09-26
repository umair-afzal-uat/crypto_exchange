<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetWithdrawalsRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->guard('admin')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'field' => ['sometimes', 'string', Rule::in([
                'id',
                'amount',
                'status',
                'user_id',
                'currency',
            ])],
            'value'   => ['required_with:field','string'],
        ];
    }

}
