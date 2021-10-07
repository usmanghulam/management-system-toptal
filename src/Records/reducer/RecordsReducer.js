import * as v from '../actions';

const INITIA_STATE = {
    records: [],
    perdayhour: 8,
};

export const RecordsReducer = (state = INITIA_STATE, action) => {
    switch (action.type) {
        case v.FETCH_USER_RECORDS_ASYNC_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        case v.ADD_USER_RECORD_ASYNC_SUCCESS:
            return {
                ...state,
                records: [action.payload, ...state.records],
            }
        case v.UPDATE_USER_RECORD_ASYNC_SUCCESS:
            const _id = action.payload._id;
            let records = state.records;
            let newRecords = records.filter(record => _id != record._id);
            return {
                ...state,
                records: [action.payload, ...newRecords],
            }
        case v.DELETE_USER_RECORD_ASYNC_SUCCESS:
            const id = action.payload._id;
            let recordsArr = state.records;
            let newrecords = recordsArr.filter(record => id != record._id);
            return {
                ...state,
                records: newrecords,
            }
        case v.SET_HOURS_PER_DAY_LOCAL:
            return {
                ...state,
                perdayhour: action.hours,
            }
        case v.FILTER_USER_RECORD_ASYNC_SUCCESS:
            return {
                ...state,
                records: action.payload,
            }
        default:
        return state;
    }
}

export default RecordsReducer;