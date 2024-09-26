<?php

namespace App\Http\Requests\Admin;

use App\Facades\TradeModule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateHotWalletSettings extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'asset_id'        => ['required', 'integer'],
            'max_on_hot'      => ['required', 'numeric', 'gt:0'],
            'min_to_transfer' => ['required', 'numeric', 'gt:0'],
        ];
    }
}
