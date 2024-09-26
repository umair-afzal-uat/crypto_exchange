import notification from '../../components/Base/Notification';
import { getErrorText } from '../../helpers/functions';
import api from '../../services/api';
import types from '../store/types';
export const getHotWallets = page => async dispatch => {
  try {
    const { data, status } = await api.hotWallet.getHotWallet(page);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch({ type: types.SET_HOT_WALLET_DATA, payload: data?.data?.wallet });
    dispatch({
      type: types.SET_HISTORY_TRANSACTIONS_DATA,
      payload: data?.data?.transactions,
    });
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};
export const setHotWallets = body => async dispatch => {
  try {
    const { data, status } = await api.hotWallet.setHotWallets(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch({ type: types.SET_HOT_WALLET_DATA, payload: data?.wallet });
    notification({
      type: 'success',
      message: 'success',
    });
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};
