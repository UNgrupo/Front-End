import {combineReducers} from 'redux';

import userReducer from './reducer-user';
import usersReducer from './reducer-users';
import signUpReducer from './reducer-signup';

const allReducers = combineReducers({
    user: userReducer,
    users: usersReducer,
    signUp: signUpReducer
});

export default allReducers;