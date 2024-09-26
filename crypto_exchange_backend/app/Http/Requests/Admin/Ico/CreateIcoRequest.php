<?php

namespace App\Http\Requests\Admin\Ico;

use Illuminate\Foundation\Http\FormRequest;

class CreateIcoRequest extends FormRequest
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
            'ico_id' => 'sometimes|int|exists:ico,id',
            'asset_id' => 'sometimes|int|exists:assets,id',
            'coins_total' => 'sometimes|numeric|gt:0',
            'coins_left' => 'sometimes|numeric|gt:0',
            'price_usd' => 'sometimes|numeric|gt:0',
        ];
    }
}
