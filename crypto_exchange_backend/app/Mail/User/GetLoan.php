<?php

namespace App\Mail\User;

use App\Jobs\QueuesNames;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/**
 * Class Registration
 *
 * @package App\Mail\Auth
 */
class GetLoan extends Mailable
{
    use Queueable;
    use SerializesModels;

    /**
     * @var array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public $subject;
    public $username;
    public $loan_amount;
    public $weekly_payment_no;
    public $first_payment;
    public $weekly_payment_amount;
    /**
     * Registration constructor.
     *
     * @param  $loan
     * @param  $user
     *
     */
    public function __construct($loan, $user)
    {
        $this->subject     = 'GetLoan';
        $this->username    = $user->first_name.' '.$user->last_name;
        $this->loan_amount = $loan['loaned_in_usd'];
        $this->weekly_payment_no = $loan['no_of_weeks'];
        $this->first_payment = $loan['down_payment'];
        $this->weekly_payment_amount = $loan['weekly_payment'];
        $this->onQueue(QueuesNames::DEFAULT);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.users.get-loan')->with(['username'=>$this->username,'loan_amount'=>$this->loan_amount,'weekly_payment_no'=>$this->weekly_payment_no,'first_payment'=>$this->first_payment,'weekly_payment_amount'=>$this->weekly_payment_amount])->subject($this->subject);
    }
}
