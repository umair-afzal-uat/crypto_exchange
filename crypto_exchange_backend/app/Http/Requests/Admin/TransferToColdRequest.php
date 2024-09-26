<?php

namespace App\Http\Requests\Admin;

use App\Traits\RequestUrl;
use Illuminate\Foundation\Http\FormRequest;

class TransferToColdRequest extends FormRequest
{
    use RequestUrl;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth('admin')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'amount'   => 'required|numeric|gt:0',
            'asset_id' => 'int|required|exists:assets,id'
        ];
    }
}
