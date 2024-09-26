import notification from '../../components/Base/Notification';
import { getErrorText } from '../../helpers/functions';
import api from '../../services/api';
import types from '../store/types';
import { HandleModal } from '../modal/actions';
import axios from 'axios';

const setQueued = data => ({ type: types.SET_QR_DATA, payload: data });
const setUsersData = data => ({ type: types.SET_USERS_DATA, payload: data });
const setUserData = data => ({ type: types.SET_USER_DATA, payload: data })
const setWaitListData = data => ({
  type: types.SET_WAITLIST_DATA,
  payload: data,
});

export const getUsers = (page, body) => async dispatch => {
  try {
    const { status, data } = await api.user.getUsers(page, body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(setUsersData(data.users));
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });

  }
};
export const getWaitListUsers = page => async dispatch => {
  try {
    const { status, data } = await api.waitList.getWaitList(page);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(setWaitListData(data));
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });

  }
};

export const getQueuedUsers = () => async dispatch => {
  try {
    const { data, status } = await api.waitList.getQueuedWaitList();
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(setQueued(data?.loan_queued));
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });

  }
};
export const setQueuedUsers = dataSetting => async dispatch => {
  try {
    const { status } = await api.waitList.setQueuedWaitList({
      down_payment: 30,
      loan_queued: dataSetting,
    });
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(getQueuedUsers());
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });

  }
};

export const deleteUser = (id, page) => async dispatch => {
  try {
    const { status } = await api.user.deleteUser(id);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(getUsers(page));
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });

  }
};

export const blockUser = (id, page) => async dispatch => {
  try {
    const { status } = await api.user.blockUser(id);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(getUsers(page));
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });

  }
};
export const approveNewLoan = (id, page) => async dispatch => {
  try {
    const { status } = await api.waitList.approveLoan(id);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(getWaitListUsers(page));
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

export const rejectNewLoan = (id, page, message) => async dispatch => {
  try {
    const { status } = await api.waitList.rejectLoan(id, { message });
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(getWaitListUsers(page));
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
export const adAddressUser = (id, address, page, actions) => async dispatch => {
  try {
    const { status } = await api.user.addAddress(id, { ...address });
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    notification({
      type: 'success',
      message: 'success',
    });
    if (actions === 'editAddressGeneral') {
      return dispatch(getUsers(page));
    }
    if (actions === 'editAddressWaitList') {
      return dispatch(getWaitListUsers(page));
    }
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
export const getUser = (id) => async dispatch => {
  try {
    const { status, data } = await api.user.getUser(id);
    if (status < 200 || status >= 300) {
      throw new Error('Something went wrong');
    }
    dispatch(setUserData(data.user));
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });

  }
};

export const sendEmailToAllWaitlistUsers = (body) => async dispatch => {
  try {
    const { data, status } = await api.user.sendEmailToAllWaitlistUsers(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
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

export const deleteAllWaitListUsers = (body) => async dispatch => {
  try {
    const { data, status } = await api.user.deleteAllWaitListUsers(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
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


export const searchUser = (body) => async dispatch => {
  try {
    const { data, status } = await api.user.searchUser(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
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
