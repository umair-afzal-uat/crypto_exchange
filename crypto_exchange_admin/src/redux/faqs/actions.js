import notification from '../../components/Base/Notification';
import { getErrorText } from '../../helpers/functions';
import api from '../../services/api';
import types from '../store/types';
import { HandleModal } from '../modal/actions';
const setFaqsData = data => ({ type: types.SET_FAQS_DATA, payload: data });
const setFaqData = data => ({ type: types.SET_FAQ_DATA, payload: data });
export const getFaqs = page => async dispatch => {
  try {
    const { data, status } = await api.faq.getFaqs(page);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');


    dispatch(setFaqsData(data.faqs));
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};

export const addFaq = (body, page) => async dispatch => {
  try {
    const { status } = await api.faq.addFaq(body);
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

export const updateFaq = (body) => async dispatch => {
  try {
    const { data, status } = await api.faq.updateFaq(body);
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

export const deleteFaq = (id) => async dispatch => {
  try {
    const { status } = await api.faq.deleteFaq(id);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });

  }
};
