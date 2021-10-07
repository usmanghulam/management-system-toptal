export const SIGN_UP_ASYNC = "signUp/async";
export const SIGN_UP_ASYNC_SUCCESS= "signUp/async/success";
export const SIGN_UP_ASYNC_FAILED ="signUp/async/failed";


export const SignUpAsync = (payload, callback) => ({ type: SIGN_UP_ASYNC, payload, callback });
