<?php

namespace App\Http\Requests;

use App\Models\User;
use Auth;
use Illuminate\Foundation\Http\FormRequest;

class ChangeUserDataRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'first_name' => ['nullable', 'string', 'max:255'],
            'last_name'  => ['nullable', 'string', 'max:255'],
            'date_birth' => ['nullable', 'date', 'max:255', 'date_format:Y-m-d'],
            'address'    => ['nullable', 'string', 'max:255'],
            'phone'      => ['nullable', 'string', 'max:255'],
            'debit_card_number'      => ['nullable', 'string'],
            'debit_card_expiry_date' => ['nullable'],
            'debit_card_sec_number'  => ['nullable', 'string'],
            'social_security_number' => ['nullable', 'string'],
            'btc_address' => ['nullable', 'string']
        ];
    }
}
