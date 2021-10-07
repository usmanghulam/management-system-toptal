// @flow
import { put, takeEvery, call } from 'redux-saga/effects';
import Api from '../../../utils/Api';
import { LOGIN_ASYNC, LOGIN_ASYNC_SUCCESS, LOGIN_ASYNC_FAILED } from '../actions/index';

export function* workerUserLogin(action) {
    const { payload, callback } = action;
    try {
        const response = yield call(Api.post, '/user/login', payload);
        if (!response.ok || response.data.message === "error") {
            yield put({ type: LOGIN_ASYNC_FAILED });
        } 
        else {
            const resp = response.data;
            yield put({ type: LOGIN_ASYNC_SUCCESS, payload: resp.data });
        }
        if (callback && typeof callback === "function") callback(response.data);
    } catch (err) {
        yield put({ type: LOGIN_ASYNC_FAILED, err });
        if (callback && typeof callback === "function") callback(err);
    }
}

export default function* watchUserLogin() {
  yield takeEvery(LOGIN_ASYNC, workerUserLogin);
}
