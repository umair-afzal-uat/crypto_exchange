import notification from '../../components/Base/Notification';
import { getErrorText } from '../../helpers/functions';
import api from '../../services/api';
import types from '../store/types';
export const getFee = setDownPayment => async dispatch => {
  try {
    const { status, data } = await api.fee.getFee();
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    setDownPayment(data.settings.down_payment);
    dispatch({ type: types.SET_FEE_DATA, payload: data });
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};

export const changeFee = (id, body) => async dispatch => {
  try {
    const { status } = await api.fee.changeFee(id, body);
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

export const changeDownPayment = body => async dispatch => {
  try {
    const { status } = await api.fee.changeDownPayment(body);
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
export const searchPersons = (body, setListPersons) => async dispatch => {
  try {
    const { data, status } = await api.fee.searchPersons(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    setListPersons(data.results);
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};

export const addPersonToGroup =
  (body, setSelectedPersonsFunck, setSearchPerson, setListPersons) =>
    async dispatch => {
      try {
        const { data, status } = await api.fee.addPersonToGroup(body);
        if (status < 200 || status >= 300)
          throw new Error('Something went wrong');
        setSelectedPersonsFunck(data);
        setSearchPerson(false);
        setListPersons([]);
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

export const removePersonFromGroup =
  (body, setSelectedPersons) => async dispatch => {
    try {
      const { status } = await api.fee.addPersonToGroup(body);
      if (status < 200 || status >= 300)
        throw new Error('Something went wrong');
      notification({
        type: 'success',
        message: 'success',
      });
      setSelectedPersons(prev => {
        return prev.filter(elem => elem?.id !== body?.user_id);
      });
    } catch (e) {
      notification({
        type: 'error',
        message: getErrorText(e?.response?.data?.errors),
      });
    }
  };

export const setMainPercent = body => async dispatch => {
  try {
    const { status } = await api.fee.setMainPercent(body);
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
export const setGroupPercent = body => async dispatch => {
  try {
    const { data, status } = await api.fee.setGroupPercent(body);
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
export const getGroupPercent =
  (setGroupPercentValue, setSelectedPersons) => async dispatch => {
    try {
      const { data, status } = await api.fee.getGroupPercent();
      if (status < 200 || status >= 300)
        throw new Error('Something went wrong');
      // notification({
      //   type: 'success',
      //   message: 'success',
      // });
      setGroupPercentValue(data[0]?.rate);
      setSelectedPersons(data[0]?.user);
    } catch (e) {
      notification({
        type: 'error',
        message: getErrorText(e?.response?.data?.errors),
      });
    }
  };
export const getMainPercent = setAllPercent => async dispatch => {
  try {
    const { data, status } = await api.fee.getMainPercent();
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    notification({
      type: 'success',
      message: 'success',
    });
    setAllPercent(data?.referral_rate);
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};
export const ReferralStatus = body => async dispatch => {
  try {

    const { data, status } = await api.fee.postStatus(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    notification({
      type: 'success',
      message: 'success',
    });
    // setAllPercent(data?.referral_rate);
  } catch (e) {
    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};
