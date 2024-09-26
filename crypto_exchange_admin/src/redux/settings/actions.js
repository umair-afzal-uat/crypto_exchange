import notification from '../../components/Base/Notification';
import { getErrorText } from '../../helpers/functions';
import api from '../../services/api';
import { getMyData } from '../auth/action';
import types from '../store/types';

const setQrData = data => ({ type: types.SET_QR_DATA, payload: data });

export const activateTwoFa = body => async dispatch => {
  try {
    const { status } = await api.settings.activateTwoFa(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(getMyData());
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};

export const deactivateTwoFa = body => async dispatch => {
  try {
    const { status } = await api.settings.deactivateTwoFa(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(getMyData());
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};
export const changePassword = body => async dispatch => {
  try {
    const { status } = await api.settings.changePassword(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
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
export const getQrImage = () => async dispatch => {
  try {
    const { status, data } = await api.settings.getSecretKey();
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(setQrData(data));
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};
