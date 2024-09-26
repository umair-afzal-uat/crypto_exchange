<?php

namespace App\Http\Requests\Auth;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class LoginRequest extends FormRequest
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
            'email'    => ['required', 'string', 'max:255', 'exists:users'],
            'password' => ['required', 'string', 'min:8'],
            'totp'     => ['string', 'nullable', 'min:6'],
            'captcha'  => ['required', 'recaptcha'],
            'remember' => ['bool']
        ];
    }
}
