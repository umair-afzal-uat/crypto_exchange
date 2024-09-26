<?php

namespace App\Http\Requests;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class CalcPaymentAmountRequest extends FormRequest
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
            'loan_id' => ['required', 'int', 'exists:loans,id'],
            'is_full' => ['required', 'boolean'],
            'payment_system' =>  ['required', 'string', 'exists:payment_systems,code'],
        ];
    }
}
