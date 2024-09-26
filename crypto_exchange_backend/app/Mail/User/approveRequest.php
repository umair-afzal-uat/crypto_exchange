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
class approveRequest extends Mailable
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
    public $hash;

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
    public function __construct($withdrawl,$user)
    {
        
        // dd($user->first_name.' '.$user->last_name);
        $this->subject= 'Withdrawl Approved';
        $this->username= $user->first_name.' '.$user->last_name;
        $this->hash= $withdrawl['tx_hash'];

        $this->onQueue(QueuesNames::DEFAULT);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.users.withdraw-complete-request')->with(['username'=>$this->username,'hash'=>$this->hash])->subject($this->subject);
    }
}
