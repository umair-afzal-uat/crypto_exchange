<?php

namespace App\Http\Controllers\Admin\Management;
use App\Enums\BaseAppEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Management\Faqs\FaqRequest;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Management\Faqs\IndexRequest;
use App\Services\FaqService;
use Illuminate\Http\Response;
class FaqsController extends Controller
{
    private FaqService $service;

    public function __construct()
    {
        $this->service = resolve(FaqService::class);
    }

    public function index(IndexRequest $request): Response
    {
        $data     = $request->validated();
        $paginate = $data['paginate'] ?? BaseAppEnum::DEFAULT_PAGINATION;
        $faqs    = $this->service->index($paginate);

        return response(compact('faqs'), Response::HTTP_OK);
    }
    public function getAllFaqs(): Response
    {
        $faqs    = $this->service->getAllFaqs();

        return response(compact('faqs'), Response::HTTP_OK);
    }
    public function addFaq(FaqRequest $request)
    {

        $data = $request->all();

        $this->service->addFaqData($data);


    }
    public function updateFaq(Request $request)
    {
        $request->validate([
            'question' => 'required',
            'answer' => 'required',
            // 'status' => 'required',
            'display_order' => 'required|unique:faqs,display_order,'.$request['id'],
        ]);
        $data = $request->all();
        $this->service->updateFaqData($data);

    }
    public function deleteFaq($delete_faq)
    {
        $this->service->deleteFaqData($delete_faq);
    }

}
