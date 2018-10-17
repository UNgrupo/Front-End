import {combineReducers} from 'redux';

import userReducer from './reducer-user';
import usersReducer from './reducer-users';

const allReducers = combineReducers({
    user: userReducer,
    users: usersReducer
});

export default allReducers;