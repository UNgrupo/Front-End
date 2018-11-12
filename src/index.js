import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import allReducers from './_reducers';

import './styles/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import App from './components/App';
import Log_in from './components/Log_in';
import Sign_up from './components/Sign_up';
import Home from './components/Home';
import New_subject from './components/New_subject';
import Topic from './components/Topic';
import New_topic from './components/New_topic';
import Questions from './components/Questions';
import New_question from './components/New_question';
import Question from './components/Question';
import Profile from './components/Profile';
import Update_profile from './components/Update_profile';
/*
import Settings_profile from './components/Settings_profile';
import Activity from './components/Activity';
import Stadistics from './components/Stadistics';
import Profile_questioner from './components/Profile_questioner';
*/

const loggerMiddleware = createLogger();

const store = createStore(
    allReducers,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default store;

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} >
                    {/*<Switch>
                        <Route path='log_in' component={Log_in}/>
                        <Route path='sign_up' component={Sign_up}/>
                        <Route path='home' component={Home}/>
                        <Route path='my_profile' component={Profile}/>
                        <Route path=':username' component={Profile}/>
                    </Switch>*/}
                </Route>
                <Route exact path='/log_in' component={Log_in}/>
                <Route exact path='/sign_up' component={Sign_up}/>
                <Route exact path='/home' component={Home}/>
                {/*<Route exact path='/my_profile' component={Profile}/>*/}
                <Route exact path='/:username' component={Profile}/>
                <Route path="/topics/:subject_id" component={Topic} />
                <Route path='/new_subject' component={New_subject}/>
                <Route path='/new_topic/:subject_id' component={New_topic}/>
                <Route exact strict path='/questions/:topic_id' component={Questions}/>
                <Route exact strict path='/questions/new_question/:topic_id' component={New_question}/>
                <Route exact strict path='/questions/:topic_id/:question_id' component={Question}/>
                <Route path='/my_profile/update' component={Update_profile}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
