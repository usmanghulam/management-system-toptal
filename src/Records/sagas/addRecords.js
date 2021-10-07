// @flow
import { put, takeEvery, call } from 'redux-saga/effects';
import Api from '../../utils/Api';
import { ADD_USER_RECORD_ASYNC, ADD_USER_RECORD_ASYNC_FAILED, ADD_USER_RECORD_ASYNC_SUCCESS } from '../actions';

export function* workerAddUserRecord(action) {
    const { payload, callback } = action;
    try {
		const response = yield call(Api.post, '/record/add', payload);
		if (!response.ok || response.data.message === "error") {
			yield put({ type: ADD_USER_RECORD_ASYNC_FAILED });
		} 
		else {
			const resp = response.data;
			yield put({ type: ADD_USER_RECORD_ASYNC_SUCCESS, payload: resp.data });
		}
		if (callback && typeof callback === "function") callback(response.data);
    } catch (err) {
		console.log(err);
		yield put({ type: ADD_USER_RECORD_ASYNC_FAILED, err });
		if (callback && typeof callback === "function") callback(err);
    }
}

export default function* watchAddUserRecord() {
  yield takeEvery(ADD_USER_RECORD_ASYNC, workerAddUserRecord);
}
