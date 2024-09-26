<?php

namespace App\Http\Requests\Admin\Auth;

use App\Models\Admin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'    => [
                'required',
                'string',
                'max:255',
                'regex:' . Admin::EMAIL_REGEX,
                'bail',
                Rule::exists('admins', 'email'),
            ],
            // 'password' => ['required', 'string', 'min:' . Admin::PASSWORD_MIN_LENGTH, 'regex:' . Admin::PASSWORD_REGEX],
            'password' => ['required', 'string', 'regex:' . Admin::PASSWORD_REGEX],
            'totp'     => ['string', 'required'],
            'remember' => ['required', 'bool'],
        ];
    }
}
