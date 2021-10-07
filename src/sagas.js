import { all } from 'redux-saga/effects';
import watchUserSignUp from './Users/Signup/sagas/SignUp';
import watchUserLogin from './Users/Login/sagas/Login';
import watchFetchUsers from './HomePage/sagas/fetchAllUsers';
import watchFetchUserRecords from './Records/sagas/fetchRecords';
import watchAddUserRecord from './Records/sagas/addRecords';
import watchUpdateUserRecord from './Records/sagas/updateRecord';
import watchDeleteUserRecord from './Records/sagas/deleteRecord';
import watchFilterUserRecords from './Records/sagas/filterRecords';

export default function* rootSaga() {
  yield all([
    watchUserSignUp(),
    watchUserLogin(),
    watchFetchUsers(),
    watchFetchUserRecords(),
    watchAddUserRecord(),
    watchUpdateUserRecord(),
    watchDeleteUserRecord(),
    watchFilterUserRecords(),
  ]);
}