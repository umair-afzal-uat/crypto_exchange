import notification from '../../components/Base/Notification';
import { getErrorText } from '../../helpers/functions';
import api from '../../services/api';
import { HandleModal } from '../modal/actions';
import types from '../store/types';
import {getUsers} from "../users/action";

export const getWithdrawals = page => async dispatch => {
  try {
    const { data, status } = await api.withdrawals.getWithdrawals(page);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch({ type: types.SET_WITHDRAWALS_DATA, payload: data.requests });
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};

export const confirmWithdrawals = id => async dispatch => {
  try {
    const { data, status } = await api.withdrawals.confirmWithdrawals(id);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch({ type: types.CHANGE_WITHDRAWALS_DATA, payload: data.withdrawal });
  } catch (e) {

    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  } finally {
    dispatch(
      HandleModal({
        modal: '',
        modalData: '',
      }),
    );
  }
};

export const rejectWithdrawals = (id, body) => async dispatch => {
  try {
    const { data, status } = await api.withdrawals.rejectWithdrawals(id, body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch({ type: types.CHANGE_WITHDRAWALS_DATA, payload: data.withdrawal });
  } catch (e) {

    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  } finally {
    dispatch(
      HandleModal({
        modal: '',
        modalData: '',
      }),
    );
  }
};
export const editAddressAndHashWithdrawals = (id, body) => async dispatch => {

  try {
    const { data, status } = await api.withdrawals.editAHWithdrawals(id, body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(getWithdrawals());
        notification({
      type: 'success',
      message: 'success',
    });
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  } finally {
    dispatch(
      HandleModal({
        modal: '',
        modalData: '',
      }),
    );
  }
};

export const updateStaffName = (body) => async dispatch => {

  try {

    const { data, status } = await api.withdrawals.editUpdateStaffName(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(getWithdrawals());
        notification({
      type: 'success',
      message: 'success',
    });
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  } finally {
    dispatch(
      HandleModal({
        modal: '',
        modalData: '',
      }),
    );
  }
};
