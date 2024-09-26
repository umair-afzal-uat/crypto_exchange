<?php

namespace App\Http\Requests\Admin\Management\Faqs;

use App\Models\Faq;
use App\Services\Base\BaseAppGuards;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FaqRequest extends FormRequest
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
            'question' => ['required'],
            'answer' => ['required'],
            // 'status' => ['required'],
            'display_order' => ['required','unique:faqs']
        ];
    }
}
