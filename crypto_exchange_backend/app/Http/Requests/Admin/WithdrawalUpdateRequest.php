<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class WithdrawalUpdateRequest extends FormRequest
{
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
            'id'      => 'int|required|exists:withdrawal_requests,id',
            'status'  => 'required|in:0,1',
            'comment' => 'nullable|string|required_if:status,0',
            'tx_hash' => 'sometimes|string',
            'network' => 'sometimes|string',
        ];
    }
}

