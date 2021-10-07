// @flow
import { put, takeEvery, call } from 'redux-saga/effects';
import Api from '../../utils/Api';
import { DELETE_USER_RECORD_ASYNC_SUCCESS, DELETE_USER_RECORD_ASYNC, DELETE_USER_RECORD_ASYNC_FAILED } from '../actions';

export function* workerDeleteUserRecord(action) {
    const { payload, callback } = action;
    try {
		const response = yield call(Api.post, '/record/delete', payload);
		if (!response.ok || response.data.message === "error") {
			yield put({ type: DELETE_USER_RECORD_ASYNC_FAILED });
		}
		else {
			yield put({ type: DELETE_USER_RECORD_ASYNC_SUCCESS, payload });
		}
		if (callback && typeof callback === "function") callback(response.data);
    } catch (err) {
		yield put({ type: DELETE_USER_RECORD_ASYNC_FAILED, err });
		if (callback && typeof callback === "function") callback(err);
    }
}

export default function* watchDeleteUserRecord() {
  yield takeEvery(DELETE_USER_RECORD_ASYNC, workerDeleteUserRecord);
}
