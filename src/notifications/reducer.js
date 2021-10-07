import { SET_NOTIFICATIONS, CLEAR_NOTIFICATIONS } from './actions';

const INTIAL_STATE = {
    type: "",
    text: "",
};

const notificationReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return {
                ...state,
                ...action.payload,
            }
        case CLEAR_NOTIFICATIONS:
            return {
                ...state,
                type: "",
                text: "",
            }
    
        default:
            return state;
    }
}

export default notificationReducer;