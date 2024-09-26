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
class drawRequest extends Mailable
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
    public $username;

    /**
     * @var string
     */
    public $btc_amount;
    public $btc_address;

    /**
     * Registration constructor.
     *
     * @param  $loan
     * @param  $user
     *
     */
    public function __construct($withdrawalRequest, $user)
    {
        $this->subject='Withdrawl Request';
        $this->username= $user->first_name.' '.$user->last_name;
        $this->btc_amount=$withdrawalRequest['amount'];
        $this->btc_address=$withdrawalRequest['address'];

        $this->onQueue(QueuesNames::DEFAULT);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.users.withdraw-request')->with(['username'=>$this->username,'btc_amount'=>$this->btc_amount,'btc_address'=>$this->btc_address])->subject($this->subject);
    }
}
