<?php

namespace App\Http\Requests\Admin\Ico;

use Illuminate\Foundation\Http\FormRequest;

class DeleteStageRequest extends FormRequest
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
            'stage_id' => 'required|int|exists:ico_stage,id',
        ];
    }
}
