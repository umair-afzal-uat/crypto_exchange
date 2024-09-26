import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';
import setDeviceId from './setDeviceId';
import notification from '../components/Base/Notification';

export default {
  init: store => {
    axios.interceptors.response.use(
      response => {
        if (sessionStorage.getItem('CryptoExchange')) {
          setAuthorizationToken(sessionStorage.CryptoExchange);
          setDeviceId(localStorage.BTC_device_id);
        } else if (localStorage.getItem('CryptoExchange')) {
          setAuthorizationToken(localStorage.CryptoExchange);
          setDeviceId(localStorage.CryptoExchange_device_id);
        }
        return response;
      },
      e => {
        if (e.response?.status === 401) {

          // store.dispatch(logout());
          notification({
            type: 'error',
            message: 'Session was ended!',
          });
          setAuthorizationToken();
          setDeviceId();
          localStorage.removeItem('CryptoExchange');
          sessionStorage.removeItem('CryptoExchange');
          window.location.replace('/');
          return false;
        }
        return Promise.reject(e);
      },
    );
  },
};
