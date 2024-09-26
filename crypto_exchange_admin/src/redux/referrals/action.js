import notification from '../../components/Base/Notification';
import { getErrorText } from '../../helpers/functions';
import api from '../../services/api';
import types from '../store/types';

export const getReferrals = page => async dispatch => {
  try {
    const { data, status } = await api.referrals.getReferrals(page);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch({ type: types.SET_REFERRALS_DATA, payload: data });
  } catch (e) {

    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};
// let msg;
//     if(e?.response?.data?.Error)
//     {
//       msg=getErrorText(!e?.response?.data?.errors);
//     }
//     notification({
//       type: 'error',
//       message: msg,
//     });