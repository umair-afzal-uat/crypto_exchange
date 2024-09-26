<?php

namespace App\Http\Requests\Admin\Management\HotWallet;

use App\Services\Base\BaseAppGuards;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Http\FormRequest;

class IndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return Authenticatable
     */
    public function authorize(): Authenticatable
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
            'paginate' => ['integer', 'min:2', 'max:20'],
        ];
    }
}
