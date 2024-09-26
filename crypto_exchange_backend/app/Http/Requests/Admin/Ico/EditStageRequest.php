<?php

namespace App\Http\Requests\Admin\Ico;

use Illuminate\Foundation\Http\FormRequest;

class EditStageRequest extends FormRequest
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
            'stage_id' => 'sometimes|int|exists:ico_stage,id',
            'date_start' => 'sometimes|date_format:Y-m-d H:i:s',
            'date_end' => 'sometimes|date_format:Y-m-d H:i:s',
            'coins_total' => 'sometimes|numeric|gt:0',
            'coins_sold' => 'sometimes|numeric|min:0',
            'price_usd' => 'sometimes|numeric|gt:0',
            'name' => 'sometimes|string',
        ];
    }
}
