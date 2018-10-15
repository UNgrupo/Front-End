import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from 'react-router-dom'

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
/*
import Profile from './components/Profile';
import Settings_profile from './components/Settings_profile';
import Activity from './components/Activity';
import Stadistics from './components/Stadistics';
import Profile_questioner from './components/Profile_questioner';
*/

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/log_in' component={Log_in}/>
            <Route path='/sign_up' component={Sign_up}/>
            <Route path='/home' component={Home}/>
            <Route path="/topics/:subject_id" component={Topic} />
            <Route path='/new_subject' component={New_subject}/>
            <Route path='/new_topic/:subject_id' component={New_topic}/>
            <Route exact path='/questions/:topic_id' component={Questions}/>
            <Route path='/questions/new_question/:topic_id' component={New_question}/>
            <Route path='/questions/:topic_id/:question_id' component={Question}/>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));

registerServiceWorker();

/*
<Route  path='/home' component={Home}/>
<Route  path='/home/profile' component={Profile}/>
<Route  path='/home/profile/settings' component={Settings_profile}/>
<Route  path='/home/profile/activity' component={Activity}/>
<Route  path='/Home/Profile/stadistics' component={Stadistics}/>
<Route  path='/home/questions' component={Questions}/>
<Route  path='/home/new_question' component={New_question}/>
<Route  path='/home/profile' component={Profile_questioner}/>
*/
