// @flow
import { put, takeEvery, call } from 'redux-saga/effects';
import Api from '../../utils/Api';
import { FETCH_USER_RECORDS_ASYNC, FETCH_USER_RECORDS_ASYNC_FAILED, FETCH_USER_RECORDS_ASYNC_SUCCESS } from '../actions';

export function* workerFetchUserRecords(action) {
    const { _id, callback } = action;
    try {
		const response = yield call(Api.post, '/record/fetch', {_id});
		if (!response.ok || response.data.message === "error") {
			yield put({ type: FETCH_USER_RECORDS_ASYNC_FAILED });
		} 
		else {
			const resp = response.data;
			yield put({ type: FETCH_USER_RECORDS_ASYNC_SUCCESS, payload: resp.data });
		}
		if (callback && typeof callback === "function") callback(response.data);
    } catch (err) {
		console.log("error", err)
		yield put({ type: FETCH_USER_RECORDS_ASYNC_FAILED, err });
		if (callback && typeof callback === "function") callback(err);
    }
}

export default function* watchFetchUserRecords() {
  yield takeEvery(FETCH_USER_RECORDS_ASYNC, workerFetchUserRecords);
}
