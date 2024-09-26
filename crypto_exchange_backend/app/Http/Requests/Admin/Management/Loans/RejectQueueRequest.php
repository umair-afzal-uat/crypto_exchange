<?php

namespace App\Http\Requests\Admin\Management\Loans;

use App\Services\Base\BaseAppGuards;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RejectQueueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function authorize()
    {
        return auth()->guard(BaseAppGuards::ADMIN)->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'message' => ['string', 'nullable', 'max:255'],
        ];
    }
}
