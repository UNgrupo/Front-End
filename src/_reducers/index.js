import {combineReducers} from 'redux';

import userReducer from './reducer-user';
import questionReducer from './reducer-question';
import authenticationReducer from './reducer-auth';
import answerReducer from './reducer-answer';
import commentReducer from './reducer-comment';
import subjectReducer from './reducer-subject';
import topicReducer from './reducer-topic';

const allReducers = combineReducers({
    user: userReducer,
    authentication: authenticationReducer,
    question: questionReducer,
    answer: answerReducer,
    comment: commentReducer,
    subject: subjectReducer,
    topic: topicReducer
});

export default allReducers;