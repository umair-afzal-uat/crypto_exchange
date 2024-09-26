<?php

namespace App\Http\Requests\Admin;

use App\Facades\TradeModule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateGasFeeSettings extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth('admin')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'gas_limit' => ['required', 'integer', 'gt:0', 'max:90000'],
            'gas_price' => ['required', 'gt:0', 'max:0.0000003'], // 300 gwei
        ];
    }

    /**
     * @return array|string[]
     */
    public function messages()
    {
        return [
            'gas_limit.gt' => 'the_gas_limit_must_be_greater_zero',
            'gas_price.gt' => 'the_gas_price_must_be_greater_zero',
        ];
    }
}
