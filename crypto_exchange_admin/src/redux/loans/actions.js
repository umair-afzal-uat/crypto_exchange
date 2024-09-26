import notification from '../../components/Base/Notification';
import { getErrorText } from '../../helpers/functions';
import api from '../../services/api';
import types from '../store/types';
import { HandleModal } from '../modal/actions';


const setLoansData = data => ({ type: types.SET_LOANS_DATA, payload: data });
const setUserLoanData = data => ({ type: types.SET_USER_LOAN_DATA, payload: data })
export const getLoans = page => async dispatch => {
  try {
    const { data, status } = await api.loans.getLoans(page);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    dispatch(setLoansData(data.loans));
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};

export const getLoansListAllUser = (id) => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getLoansListAllUser(id);
      if (status >= 200 && status < 300) {

        dispatch(setUserLoanData(data.user_loans));
      }
    } catch (e) {
      notification({
        type: 'error',
        message: getErrorText(e?.response?.data?.errors),
      });
    }
  };
};


export const getLoansListActiveUser = (id) => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getLoansListActiveUser(id);
      if (status >= 200 && status < 300) {

        dispatch(setUserLoanData(data.user_loans));
      }
    } catch (e) {
      notification({
        type: 'error',
        message: getErrorText(e?.response?.data?.errors),
      });
    }
  };
};


export const getLoansListOldUser = (id) => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getLoansListOldUser(id);
      if (status >= 200 && status < 300) {

        dispatch(setUserLoanData(data.user_loans));
      }
    } catch (e) {
      notification({
        type: 'error',
        message: getErrorText(e?.response?.data?.errors),
      });
    }
  };
};

export const markCompleted = (body) => async dispatch => {
  try {
    const { data, status } = await api.loans.markCompleted(body);
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

