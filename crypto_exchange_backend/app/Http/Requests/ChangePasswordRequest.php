<?php

namespace App\Http\Requests;

use App\Models\User;
use Auth;
use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
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
            'oldPassword' => ['required', 'string', 'min:8', 'regex:'.User::PASSWORD_REGEX],
            'password' => ['required', 'string', 'min:8', 'regex:'.User::PASSWORD_REGEX],
            'passwordConfirmation' => ['required', 'string', 'min:8', 'regex:'.User::PASSWORD_REGEX, 'same:password']
        ];
    }
}
