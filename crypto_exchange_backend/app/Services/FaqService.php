<?php

namespace App\Services;

use App\Models\Faq;
use App\Repositories\General\FaqRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class FaqService extends FaqRepository
{


    public function index(int $paginate): LengthAwarePaginator
    {
        $faqs = $this->newQuery()->orderBy('id', 'desc')->paginate($paginate);
        return $faqs;
    }
    public function getAllFaqs(): array
    {
        $faqs = $this->newQuery()->orderBy('display_order', 'asc')->get()->toArray();

        return $faqs;
    }

    public function addFaqData($data): void
    {

        $faq = Faq::create([
            'question' => $data['question'],
            'answer' => $data['answer'],
            'display_order' => $data['display_order'],
            'status' => isset($data['status']) ? 1 : 0
        ]);


    }
    public function updateFaqData($data)
    {

        $faq = Faq::where('id', $data['id'])->first();
        $faq->question = $data['question'];
        $faq->answer = $data['answer'];
        $faq->display_order = $data['display_order'];
        $faq->status = isset($data['status']) ? 1 : 0;
        $faq->save();

    }
    public function deleteFaqData($id)
    {
        $faq = Faq::find( $id );
        $faq->delete();
    }

}
