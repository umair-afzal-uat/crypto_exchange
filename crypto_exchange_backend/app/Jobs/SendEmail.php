<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Mail;
use App\Mail\User\AdminWaitList;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $mail_data;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($mail_data)
    {
        $this->mail_data = $mail_data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $input = [];

        $users = [];
        if(empty($this->mail_data['user_ids']))
        {
            $users = User::pluck('email')->toArray();
        }
        else
        {
            // $users = \DB::table('users')
            // ->whereIn('id', $this->mail_data['user_ids'])
            // ->pluck('email')->toArray();
            $users = \DB::table('loan_queue')
                        ->join('users', 'loan_queue.user_id', '=', 'users.id')
                        ->whereIn('loan_queue.id', $this->mail_data['user_ids'])
                        ->pluck('email')->toArray();
        }
        $input['subject'] = $this->mail_data['subject'];

        // Mail::send('emails.admin.mass-mail', [], function($message) use($users, $input){
        //     $message->to($users) ->subject($input['subject']);
        // });

        if(!empty($users))
        {
            foreach($users as $user)
            {
                Mail::to($user)->queue(new AdminWaitlist());
            }
        }
    }
}
