import { combineReducers } from 'redux';
import UserReducer from '../src/Users/UserReducer';
import notificationReducer from './notifications/reducer';
import HomeReducer from './HomePage/reducer/homePageReducer';
import RecordsReducer from './Records/reducer/RecordsReducer';

const allReducers = combineReducers({
    UserReducer,
    notificationReducer,
    HomeReducer,
    RecordsReducer,
});

export default allReducers;