// @flow
import { put, takeEvery, call } from 'redux-saga/effects';
import Api from '../../../utils/Api';
import { SIGN_UP_ASYNC, SIGN_UP_ASYNC_SUCCESS, SIGN_UP_ASYNC_FAILED } from '../actions/index';

export function* workerUserSignUp(action) {
    const { payload, callback } = action;
    try {
        const response = yield call(Api.post, '/user/signup', payload);

        if (!response.ok || (response.message && response.message.type === "error")) {
            yield put({ type: SIGN_UP_ASYNC_FAILED });
        }
        else {
            const resp = response.data;
            yield put({ type: SIGN_UP_ASYNC_SUCCESS, payload: resp.data });
        }
        if (callback && typeof callback === "function") callback(response.data);
    } catch (err) {
        yield put({ type: SIGN_UP_ASYNC_FAILED, err });
        if (callback && typeof callback === "function") callback(err);
    }
}

export default function* watchUserSignUp() {
  yield takeEvery(SIGN_UP_ASYNC, workerUserSignUp);
}
