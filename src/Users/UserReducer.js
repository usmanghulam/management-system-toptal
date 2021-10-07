
import { LOGIN_ASYNC_SUCCESS } from './Login/actions';
import { SIGN_UP_ASYNC_SUCCESS } from './Signup/actions';
import { USER_SIGNOUT_ASYNC_SUCCESS } from './actions';

const INITIAL_STATE = {
    isAuthenticated: false,
    jwtToken: "",
    first_name: "",
    last_name: "",
    email: "",
    type: ""
}

const UserReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_ASYNC_SUCCESS:
        case SIGN_UP_ASYNC_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            }
        case USER_SIGNOUT_ASYNC_SUCCESS:
            return {
                ...state,
                jwtToken: "",
                first_name: "",
                last_name: "",
                email: "",
                type: "",
                isAuthenticated: false,
            }
        default:
            return state;
    }
}
export default UserReducer;