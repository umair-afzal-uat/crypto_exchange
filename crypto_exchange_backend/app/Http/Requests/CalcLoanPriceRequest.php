<?php

namespace App\Http\Requests;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class CalcLoanPriceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'btc' => ['required_if:usd,null', 'numeric', 'gt:0'],
            'amount' => ['required_if:btc,null', 'numeric', 'gt:0'],
            'asset_code' =>  ['required', 'string', 'exists:assets,code'],
            'loan_period_id' => ['required', 'int', 'exists:loan_period_settings,id'],
        ];
    }
}
