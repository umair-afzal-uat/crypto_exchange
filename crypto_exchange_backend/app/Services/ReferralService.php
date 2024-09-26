<?php

namespace App\Services;

use App\Models\Account;
use App\Models\Asset;
use App\Models\Loan;
use App\Models\LoanMainSettings;
use App\Models\ReferralGroup;
use App\Models\ReferralPayment;
use App\Models\User;
use App\Repositories\Loans\LoanRepository;
use App\Traits\FormatsAmount;
use DB;

class ReferralService extends LoanRepository
{
    use FormatsAmount;

    public function getReferralPayments(int $userId): array
    {
        $referralGroup = User::where('id', $userId)->first()->referralGroup()->first();

        if (!empty($referralGroup)) {
            $referralRate = $referralGroup->rate;
        } else {
            $referralRate = LoanMainSettings::first()->referral_rate;
        }

        $referrals = Account::with(['user' => function($query) {
            $query->with(['firstLoan' => function($query) {
                $query->with(['referralPayment', 'lastLoanPeriod','loanperiod'])->orderBy('id', 'asc');
            }]);
        }])->where('parent_id', $userId)->get()->toArray();

        $referralsCnt = count($referrals);

        for ($i = 0; $i < $referralsCnt; $i++) {
            if (isset($referrals[$i]['user']['referral_payment'])) {
                $referrals[$i]['user']['referral_payment']['amount_btc'] = $this->formatAmount($referrals[$i]['user']['referral_payment']['amount_usd'], Asset::PRECISION_FIAT, Asset::TYPE_FIAT);
                $referrals[$i]['user']['first_loan']['last_loan_period']["payment_date"] = @date("m/d/Y", strtotime("- 6 DAY",strtotime($referrals[$i]['user']['first_loan']['last_loan_period']["payment_date"])));
            }

            if (isset($referrals[$i]['user']['first_loan'])) {
                $referralAmount = $referrals[$i]['user']['first_loan']['loaned_in_usd'] / 100 * $referralRate;
                $referrals[$i]['user']['first_loan']['amount_btc_reward'] = $this->formatAmount($referralAmount, Asset::PRECISION_FIAT, Asset::TYPE_FIAT);
                $referrals[$i]['user']['first_loan']['last_loan_period']["payment_date"] = @date("m/d/Y", strtotime("- 6 DAY",strtotime($referrals[$i]['user']['first_loan']['last_loan_period']["payment_date"])));
            }

        }

        return $referrals;
    }

    public function getAllReferralPayments($perPage)
    {
        //$results =  ReferralPayment::with('user', 'referralUser')->paginate($perPage)->toArray();






        $referrals = Account::with(['user' => function($query) {
            $query->with(['firstLoan' => function($query) {
                $query->with(['referralPayment', 'lastLoanPeriod','loanperiod'])->orderBy('id', 'asc');
            }]);
        }])->whereRaw('parent_id IS NOT NULL')->paginate($perPage)->toArray();

        // foreach($results["data"] as $k=>$ds){
        //     $results["data"][$k]["loan"] =  Loan::where('id', $ds["loan_id"])->first();
        // }

        foreach($referrals["data"] as $k=>$ds){

            $userexist=User::where('id', $ds["parent_id"])->first();

            if(!empty($userexist)){
                $referralGroup = $userexist->referralGroup()->first();
            }

            if (!empty($referralGroup)) {
                $referralRate = $referralGroup->rate;
            } else {
                $referralRate = LoanMainSettings::first()->referral_rate;
            }

            if (isset($referrals["data"][$k]['user']['referral_payment'])) {
                $referrals["data"][$k]['user']['referral_payment']['amount_btc'] = $this->formatAmount($referrals["data"][$k]['user']['referral_payment']['amount_usd'], Asset::PRECISION_FIAT, Asset::TYPE_FIAT);
                $referrals["data"][$k]['user']['first_loan']['last_loan_period']["payment_date"] = @date("m/d/Y", strtotime("- 6 DAY",strtotime($referrals["data"][$k]['user']['first_loan']['last_loan_period']["payment_date"])));
                $referrals["data"][$k]['user']['rr'] = $referralRate;
            }

            if (isset($referrals["data"][$k]['user']['first_loan'])) {
                $referralAmount = $referrals["data"][$k]['user']['first_loan']['loaned_in_usd'] / 100 * $referralRate;
                $referrals["data"][$k]['user']['first_loan']['amount_btc_reward'] = $this->formatAmount($referralAmount, Asset::PRECISION_FIAT, Asset::TYPE_FIAT);
                $referrals["data"][$k]['user']['first_loan']['last_loan_period']["payment_date"] = @date("m/d/Y", strtotime("- 6 DAY",strtotime($referrals["data"][$k]['user']['first_loan']['last_loan_period']["payment_date"])));
                $referrals["data"][$k]['user']['rr'] = $referralRate;
            }
            if(!empty($userexist)){
                $referrals["data"][$k]["parent"] =  $userexist;
            }
        }
        
        return $referrals;
    }

    public function getReferralMain()
    {
        return LoanMainSettings::select('referral_rate')->firstOrFail()->toArray();
    }

    public function getReferralGroup()
    {
        return ReferralGroup::with('user')->get()->toArray();
    }

    public function manageUserReferralGroup(int $userId, ?int $groupId)
    {
        $user = User::where('id', $userId)->firstOrFail();

        $user->referral_group_id = $groupId;
        $user->save();

        return $user->fresh()->toArray();
    }

    public function editGroupRate($groupId, $rate)
    {
        ReferralGroup::where('id', $groupId)->update(['rate' => $rate]);
    }

    public function editMainRate($rate)
    {
        LoanMainSettings::query()->update(['referral_rate' => $rate]);
    }
    public function updatePayoutStatus($req)
    {
        ReferralPayment::where('id', $req->id)->update(['payout_status' => $req->Payout_Status ,'payment_status' =>$req->Payment_Status]);
    }
}
