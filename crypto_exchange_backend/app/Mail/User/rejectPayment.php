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
class rejectPayment extends Mailable
{
    use Queueable;
    use SerializesModels;

    /**
     * @var array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public $subject;

    /**
     * @var string
     */
    public $payment;

    /**
     * @var string
     */
    public $username;

    /**
     * Registration constructor.
     *
     * @param  $loan
     * @param  $user
     *
     */
    public function __construct($payment, $user)
    {
        $this->subject= 'Payment Rejected';
        $this->username= $user->first_name.' '.$user->last_name;
        $this->payment= $payment['amount_usd'];

        $this->onQueue(QueuesNames::DEFAULT);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.users.payment-reject')->with(['username'=>$this->username,'payment'=>$this->payment])->subject($this->subject);
    }
}
