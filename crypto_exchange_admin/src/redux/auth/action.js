import setAuthorizationToken from '../../helpers/setAuthorizationToken';
import setDeviceId from '../../helpers/setDeviceId';
import routes from '../../routes/index';
import api from '../../services/api';
import types from '../store/types';
import { HandleModal } from '../modal/actions';
import { getErrorText } from '../../helpers/functions';
import notification from '../../components/Base/Notification';
const setAuthData = data => ({ type: types.SET_AUTH_DATA, payload: data });
export const loadStart = () => ({ type: types.LOAD_START });
export const loadFinish = () => ({ type: types.LOAD_FINISH });
const logOut = () => ({ type: types.USER_LOG_OUT });
export const login =
  ({ push, state }) =>
  async dispatch => {
    try {
      dispatch(loadStart());
      const resAdminLogin = await api.auth.login(state);
      if (resAdminLogin.status >= 200 && resAdminLogin.status < 300) {
        dispatch(setAuthData(resAdminLogin.data.userData));
        setAuthorizationToken(resAdminLogin.data.token);
        setDeviceId(localStorage.CryptoExchange_device_id);
        push(routes.UserManagement.path);
        if (state.remember) {
          localStorage.setItem('CryptoExchange', resAdminLogin.data.token);
        } else {
          sessionStorage.setItem('CryptoExchange', resAdminLogin.data.token);
        }
      }
    } catch (e) {
      notification({
        type: 'error',
        message: getErrorText(e?.response?.data?.errors),
      });
      dispatch(loadFinish());
      if (e?.response?.data?.errors[0] === 'need_approve_auth_from_email') {
        dispatch(
          HandleModal({
            modal: 'ConfirmLogin',
            modalData: {},
          }),
        );
      }
    }
  };

export const getAdminData = () => async dispatch => {
  try {
    dispatch(loadStart());
    if (sessionStorage.CryptoExchange) {
      setAuthorizationToken(sessionStorage.CryptoExchange);
      setDeviceId(localStorage.CryptoExchange_device_id);
    } else if (localStorage.CryptoExchange) {
      setAuthorizationToken(localStorage.CryptoExchange);
      setDeviceId(localStorage.CryptoExchange_device_id);
      setDeviceId(localStorage.CryptoExchange_device_id);
    }
    const { status, data } = await api.auth.getAdminData();
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(setAuthData(data.adminData));
  } catch (e) {

    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
    setAuthorizationToken();
    setDeviceId();
    dispatch(loadFinish());
  }
};

export const getMyData = () => async dispatch => {
  try {
    dispatch(loadStart());
    const { status, data } = await api.auth.getAdminData();
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    dispatch(setAuthData(data.adminData));
  } catch (e) {

    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
  }
};
export const logout = () => {
  return async dispatch => {
    try {
      dispatch(loadStart());
      const resLogout = await api.auth.logout();
      if (resLogout.status >= 200 && resLogout.status < 300) {
        setAuthorizationToken();
        setDeviceId();
        localStorage.removeItem('CryptoExchange');
        sessionStorage.removeItem('CryptoExchange');
        dispatch(logOut());
        dispatch(loadFinish());
      }
    } catch (e) {

      notification({
        type: 'error',
        message: getErrorText(e?.response?.data?.errors),
      });
      dispatch(loadFinish());
    }
  };
};

export const confirmLogin = (body, close) => async dispatch => {
  try {
    dispatch(loadStart());
    const { status } = await api.auth.confirmLogin(body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    close();
    dispatch(loadFinish());
  } catch (e) {

    notification({
      type: 'error',
      message: getErrorText(e?.response?.data?.errors),
    });
    dispatch(loadFinish());
  }
};
