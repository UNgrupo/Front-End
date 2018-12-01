import {combineReducers} from 'redux';

import userReducer from './reducer-user';
import questionReducer from './reducer-question';
import authenticationReducer from './reducer-auth';
import answerReducer from './reducer-answer';
import commentReducer from './reducer-comment';
import subjectReducer from './reducer-subject';
import topicReducer from './reducer-topic';
import statisticReducer from './reducer-statistic';
import photoReducer from './reducer-photo';

const allReducers = combineReducers({
    user: userReducer,
    authentication: authenticationReducer,
    question: questionReducer,
    answer: answerReducer,
    comment: commentReducer,
    subject: subjectReducer,
    topic: topicReducer,
    statistic: statisticReducer,
    photo: photoReducer
});

export default allReducers;