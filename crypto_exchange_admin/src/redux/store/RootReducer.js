import { combineReducers } from 'redux';
import { auth } from '../auth/reducer';
import { isQueued, users, user, waitList } from '../users/reducer';
import { modal } from '../modal/reducer';
import { settings } from '../settings/reducer';
import { loans, user_loan } from '../loans/reducer';
import { fee } from '../fee/reducer';
import { transactions } from '../transactions/reducer';
import { withdrawals } from '../withdrawals/reducer';
import { referrals } from '../referrals/reducer';
import { hotWallet } from '../hotWallets/reducer';
import { faqs, addfaq } from '../faqs/reducer';
const rootReducers = combineReducers({
  auth,
  users,
  user,
  waitList,
  modal,
  settings,
  loans,
  fee,
  transactions,
  withdrawals,
  referrals,
  hotWallet,
  isQueued,
  user_loan,
  faqs,
  addfaq
});

export default rootReducers;
