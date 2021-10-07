export const USER_SIGNOUT_ASYNC = "user/signout/async";
export const USER_SIGNOUT_ASYNC_SUCCESS = "user/signout/async/success";
export const USER_SIGNOUT_ASYNC_FAILED = "user/signout/async/failed";


export const signoutAsync = (paylaad, callback) => ({ type: USER_SIGNOUT_ASYNC, paylaad, callback });