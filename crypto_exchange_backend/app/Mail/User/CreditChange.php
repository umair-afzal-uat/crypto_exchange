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
class CreditChange extends Mailable
{
    use Queueable;
    use SerializesModels;

    /**
     * @var array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public $subject;
    public $username;
    public $email;
    /**
     * Registration constructor.
     *
     * @param  $loan
     * @param  $user
     *
     */
    public function __construct($user)
    {
        $this->subject     = 'Setting Changed';
        $this->username    = $user->first_name.' '.$user->last_name;
        $this->email    = $user->email;
        $this->onQueue(QueuesNames::DEFAULT);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.users.change-setting')->with(['username'=>$this->username,'email'=>$this->email])->subject($this->subject);
    }
}
