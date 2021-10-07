// @flow
import { put, takeEvery, call } from 'redux-saga/effects';
import Api from '../../utils/Api';
import { UPDATE_USER_RECORD_ASYNC, UPDATE_USER_RECORD_ASYNC_FAILED, UPDATE_USER_RECORD_ASYNC_SUCCESS } from '../actions';

export function* workerUpdateUserRecord(action) {
    const { payload, callback } = action;
    try {
		const response = yield call(Api.post, '/record/update', payload);
		if (!response.ok || response.data.message === "error") {
			yield put({ type: UPDATE_USER_RECORD_ASYNC_FAILED });
		} 
		else {
			yield put({ type: UPDATE_USER_RECORD_ASYNC_SUCCESS, payload });
		}
		if (callback && typeof callback === "function") callback(response.data);
    } catch (err) {
		yield put({ type: UPDATE_USER_RECORD_ASYNC_FAILED, err });
		if (callback && typeof callback === "function") callback(err);
    }
}

export default function* watchUpdateUserRecord() {
  yield takeEvery(UPDATE_USER_RECORD_ASYNC, workerUpdateUserRecord);
}
