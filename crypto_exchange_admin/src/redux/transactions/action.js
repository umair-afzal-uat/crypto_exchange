import notification from '../../components/Base/Notification';
import { getErrorText } from '../../helpers/functions';
import api from '../../services/api';
import { HandleModal } from '../modal/actions';
import types from '../store/types';

export const getTransactions = page => async dispatch => {
  try {
    const { data, status } = await api.transactions.getTransactions(page);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch({ type: types.SET_TRANSACTIONS_DATA, payload: data.transactions });
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};

export const confirmTransactions = (id, getData) => async dispatch => {
  try {
    const { status } = await api.transactions.confirmTransactions({
      payment_id: id,
    });
    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    getData();
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

export const rejectTransactions = (id, body, getData) => async dispatch => {
  try {
    const { status } = await api.transactions.rejectTransactions({
      payment_id: id,
      comment: body?.message,
    });
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    notification({
      type: 'success',
      message: 'success',
    });
    getData();
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

export const changeTransaction = (body, getData) => async dispatch => {
  try {
    const { status } = await api.transactions.changeTransaction(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    notification({
      type: 'success',
      message: 'success',
    });
    getData();
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



export const getPaymentInfo = id => async dispatch => {
  try {
    const { data, status } = await api.transactions.getPaymentInfo(id);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch({ type: types.SET_PAYMENT_DATA, payload: data.payment_details });
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


export const editPaymentStatus = (body) => async dispatch => {
  try {
    const { data, status } = await api.transactions.editPaymentStatus(body);
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
  } finally {
    dispatch(
      HandleModal({
        modal: '',
        modalData: '',
      }),
    );
  }
};


export const getMissedTransactions = () => async dispatch => {
  try {
    const { data, status } = await api.transactions.getMissedTransactions();

    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch({ type: types.GET_MISSED_PAYMENT_DATA, payload: data.missed_payments });
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};


export const getLoanDetail = (id) => async dispatch => {
  try {
    const { data, status } = await api.transactions.getLoanDetail(id);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch({ type: types.GET_LOAN_DATA, payload: data.loan_payment_missed });

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




