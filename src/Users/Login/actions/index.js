export const LOGIN_ASYNC = "login/async";
export const LOGIN_ASYNC_SUCCESS = "login/async/success";
export const LOGIN_ASYNC_FAILED = "login/async/success";


export const loginAsync = (payload, callback) => ({ type: LOGIN_ASYNC, payload, callback });
