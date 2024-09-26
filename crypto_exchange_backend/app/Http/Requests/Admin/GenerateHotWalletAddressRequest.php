<?php

namespace App\Http\Requests\Admin;

use App\Traits\RequestUrl;
use Illuminate\Foundation\Http\FormRequest;

class GenerateHotWalletAddressRequest extends FormRequest
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
            'asset_code'   => 'exists:assets,code',
        ];
    }
}
