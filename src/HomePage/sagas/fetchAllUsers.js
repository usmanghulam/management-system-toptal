// @flow
import { put, takeEvery, call } from 'redux-saga/effects';
import Api from '../../utils/Api';
import { FETC_USERS_FOR_NON_USER_ASYNC, FETC_USERS_FOR_NON_USER_ASYNC_SUCCESS, FETC_USERS_FOR_NON_USER_ASYNC_FAILED } from '../actions';

export function* workerFetchUsers(action) {
    const { callback } = action;
    try {
        const response = yield call(Api.get, '/user/fetchUsers');
        if (!response.ok || response.data.message === "error") {
            yield put({ type: FETC_USERS_FOR_NON_USER_ASYNC_FAILED });
        } 
        else {
            const resp = response.data;
            yield put({ type: FETC_USERS_FOR_NON_USER_ASYNC_SUCCESS, payload: resp.data });
        }
        if (callback && typeof callback === "function") callback(response.data);
    } catch (err) {
        yield put({ type: FETC_USERS_FOR_NON_USER_ASYNC_FAILED, err });
        if (callback && typeof callback === "function") callback(err);
    }
}

export default function* watchFetchUsers() {
  yield takeEvery(FETC_USERS_FOR_NON_USER_ASYNC, workerFetchUsers);
}
