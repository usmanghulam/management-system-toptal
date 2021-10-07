// constants

export const FETCH_USER_RECORDS_ASYNC = "fetch/user/records/async";
export const FETCH_USER_RECORDS_ASYNC_SUCCESS = "fetch/user/records/async/success";
export const FETCH_USER_RECORDS_ASYNC_FAILED = "fetch/user/records/async/failed";

export const ADD_USER_RECORD_ASYNC = "add/user/record/async";
export const ADD_USER_RECORD_ASYNC_SUCCESS = "add/user/record/async/success";
export const ADD_USER_RECORD_ASYNC_FAILED = "add/user/record/async/failed";

export const UPDATE_USER_RECORD_ASYNC = "update/user/record/async";
export const UPDATE_USER_RECORD_ASYNC_SUCCESS = "update/user/record/async/success";
export const UPDATE_USER_RECORD_ASYNC_FAILED = "update/user/record/async/failed";

export const DELETE_USER_RECORD_ASYNC = "delete/user/record/async";
export const DELETE_USER_RECORD_ASYNC_SUCCESS = "delete/user/record/async/success";
export const DELETE_USER_RECORD_ASYNC_FAILED = "delete/user/record/async/failed";

export const SET_HOURS_PER_DAY_LOCAL = "set/hours/per/day/local";

export const FILTER_USER_RECORD_ASYNC = "filter/user/record/async";
export const FILTER_USER_RECORD_ASYNC_SUCCESS = "filter/user/record/async/success";
export const FILTER_USER_RECORD_ASYNC_FAILED = "filter/user/record/async/failed";


// action creators
export const fetchUserRecords = (_id, callback) => ({ type: FETCH_USER_RECORDS_ASYNC, _id, callback });
export const addUserRecord = (payload, callback) => ({ type: ADD_USER_RECORD_ASYNC, payload, callback });
export const updateUSerRecord = (payload, callback) => ({ type: UPDATE_USER_RECORD_ASYNC, payload, callback });
export const deleteUserRecord = (payload, callback) => ({ type: DELETE_USER_RECORD_ASYNC, payload, callback });
export const setPerHours = hours => ({ type: SET_HOURS_PER_DAY_LOCAL, hours });
export const filterUserRecords = (payload, callback) => ({ type: FILTER_USER_RECORD_ASYNC, payload, callback });