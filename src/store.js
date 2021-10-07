import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import decode from 'jwt-decode';
import allReducers from './reducers';
import rootSaga from './sagas';
import { getCookie } from './utils/cookie';

const setUserTokenValues = (state) => {
  const { UserReducer } = state;
  try {
    if (!UserReducer) return {};
    const { isAuthenticated } = UserReducer;
    if (isAuthenticated) return UserReducer;
      let cookie = "";
      let __token__ = "";
      cookie = getCookie('__user__token');
      __token__ = cookie ? JSON.parse(cookie) : {};
      if (__token__) {
        let user = decode(__token__);
        return {
          ...user,
          isAuthenticated: true,
          jwtToken: __token__,
        };
      }
    }
  catch (error) {
    return UserReducer;
  }
}

const StoreSingleton = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const sagaMiddleware = createSagaMiddleware();
    let store = createStore(
        allReducers,
        composeEnhancers(applyMiddleware(
          sagaMiddleware,
        )),
    );

    let state = store.getState();
    let LoggedInuser = setUserTokenValues(state);
    if (LoggedInuser && (typeof LoggedInuser === "object")) {
      store.getState().UserReducer = LoggedInuser;
    }

    sagaMiddleware.run(rootSaga);

    window.store = store;
    return store;
};

export default StoreSingleton;