import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './RootReducer';
import rootSaga from './RootSaga';
import interceptors from '../../helpers/axiosInterceptors';
import { getAdminData } from '../auth/action';

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
    : applyMiddleware(thunk, sagaMiddleware);

export const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

interceptors.init(store);

if (sessionStorage.CryptoExchange || localStorage.CryptoExchange) {
  store.dispatch(getAdminData());
}

export default store;
