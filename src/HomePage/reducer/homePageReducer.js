import * as v from "../actions";
const INITIAL_STATE = {
    users: [],
};
const homePageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case v.FETC_USERS_FOR_NON_USER_ASYNC_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
    
        default:
            return state;
    }
}

export default homePageReducer;