import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import './styles/css/styles.min.css';
import './index.css';
import { NotificationContainer } from 'react-notifications';
if (!localStorage.CryptoExchange_device_id) {
  const device_id = () => {
    let b = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
    do {
      const c = Math.floor(Math.random() * 42 + 48);
      if (c < 58 || c > 64) b += String.fromCharCode(c);
    } while (b.length < 48);
    return b;
  };
  localStorage.setItem('CryptoExchange_device_id', device_id());
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NotificationContainer />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
reportWebVitals();
