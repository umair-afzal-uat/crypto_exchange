<?php

namespace App\Http\Requests\Admin\Ico;

use Illuminate\Foundation\Http\FormRequest;

class CreateStageRequest extends FormRequest
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
            'date_start' => 'required|date_format:Y-m-d H:i:s',
            'date_end' => 'required|date_format:Y-m-d H:i:s',
            'price_usd' => 'required|numeric|gt:0',
            'coins_total' => 'required|numeric|gt:0',
            'ico_id' => 'required|int|exists:ico,id',
            'name' => 'required|string',
        ];
    }
}
