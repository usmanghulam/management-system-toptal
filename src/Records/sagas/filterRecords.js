// @flow
import { put, takeEvery, call } from 'redux-saga/effects';
import Api from '../../utils/Api';
import { FILTER_USER_RECORD_ASYNC, FILTER_USER_RECORD_ASYNC_FAILED, FILTER_USER_RECORD_ASYNC_SUCCESS } from '../actions';

export function* workerFilterUserRecords(action) {
    const { payload, callback } = action;
    try {
		const response = yield call(Api.post, '/record/filter', payload);
		if (!response.ok || response.data.message === "error") {
			yield put({ type: FILTER_USER_RECORD_ASYNC_FAILED });
		} 
		else {
			const resp = response.data;
            if (resp && resp.data) {
                yield put({ type: FILTER_USER_RECORD_ASYNC_SUCCESS, payload: resp.data });
            }
		}
		if (callback && typeof callback === "function") callback(response.data);
    } catch (err) {
		console.log(err);
		yield put({ type: FILTER_USER_RECORD_ASYNC_FAILED, err });
		if (callback && typeof callback === "function") callback(err);
    }
}

export default function* watchFilterUserRecords() {
  yield takeEvery(FILTER_USER_RECORD_ASYNC, workerFilterUserRecords);
}
