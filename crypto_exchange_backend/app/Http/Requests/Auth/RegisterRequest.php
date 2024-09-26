<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Auth;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'email'      => [
                'required',
                'string',
                'regex:' . User::EMAIL_REGEX,
                'email:rfc,dns',
                'max:255',
                'unique:users',
            ],
            'password'   => ['required', 'string', 'regex:' . User::PASSWORD_REGEX],
            'debit_card_number'   => ['nullable','string'],
            'debit_card_sec_number'   => ['nullable','string'],
            'debit_card_expiry_date'   => ['nullable','string'],
            'social_security_number'   => ['nullable','string'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name'  => ['required', 'string', 'max:255'],
            // 'phone'      => ['string', 'max:255', 'regex:' . User::PHONE_REGEX],
            'phone'      => ['string', 'max:255'],
            'state'      => ['string', 'max:255'],
            'city'      => ['string', 'max:255'],
            'zip'      => ['string', 'max:255'],
            'date_birth' => ['date', 'max:255', 'date_format:Y-m-d'],
            'address'    => ['string', 'max:255'],
            'referral'   => ['nullable', 'string', 'max:255'],
        ];
    }
}
