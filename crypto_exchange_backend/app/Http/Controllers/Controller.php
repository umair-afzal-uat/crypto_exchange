<?php

namespace App\Http\Controllers;

use App\Traits\FormatsErrorResponse;
use App\Traits\HttpResponses;
use App\Traits\ProcessingPagination;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, HttpResponses, FormatsErrorResponse, ProcessingPagination;
}
