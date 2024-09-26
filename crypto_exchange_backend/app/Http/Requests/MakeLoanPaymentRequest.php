<?php

namespace App\Http\Requests;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class MakeLoanPaymentRequest extends FormRequest
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
            'loan_id' => 'int|exists:loans,id|required',
            'payment_system' => 'string|required|exists:payment_systems,code',
            'is_full' => 'boolean|required',
            'message' => 'nullable|string|max:500',
        ];
    }
}
