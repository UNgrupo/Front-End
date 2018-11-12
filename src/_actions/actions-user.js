import axios from 'axios';

import authHeader from '../_helpers/Auth-header.js';
import API_ROUTE from '../_helpers/Route-api';
import Common from './actions-common';

const element = 'users';
const commonActions = new Common(element);

const userActions = {
    ...commonActions.getActions,
    login,
    loginFacebook,
    logout,
    signUp,
    getUserByUsername
};

export default userActions;

function loginFacebook( token ){
    return async dispatch => {
        
        document.body.classList.add('busy-cursor');
        await axios.get(API_ROUTE + "auth/facebook/callback?code=" + token.accessToken )
        .then(async resp => {
            window.localStorage.setItem('user', JSON.stringify( {jwt: token.accessToken} ));
            dispatch(success( 'Log success' ));
            await getUserIdByEmail( token.email );
        })
        .catch(error =>{
            dispatch( failure( "The facebook user is not registered din the page") );
        });
        document.body.classList.remove('busy-cursor');
        
    };
    function success(user) { return { type: 'LOGIN-SUCCESS', data: user } }
    function failure(error) { return { type: 'LOGIN-FAILURE', data: error } }
    async function getUserIdByEmail( email ){
        document.body.classList.add('busy-cursor');
        await axios.get(API_ROUTE + 'users.json', {headers: authHeader()})
        .then(response => {
            response.data.data.map( user => {
                if(user.attributes.email === email){
                    window.localStorage.setItem('user-id', user.id);
                }
            });  
        })
        .catch(error => {
            console.log(error.response);
        });
        document.body.classList.remove('busy-cursor');
    }
}

function login( user ){
    
    const { email, password } = user;
    
    return async dispatch => {
        const data = {
        	"auth": {
        		"email": email,
        		"password": password
        	}
        };
        document.body.classList.add('busy-cursor');
        await axios.post(API_ROUTE + 'user_token', data)
        .then(response => {
            const token = response.data;
            if( token && token.jwt ){
                dispatch(success( 'Log success' ));
                window.localStorage.setItem('user', JSON.stringify( token ));
                getUserIdByEmail( email );
            }
        })
        .catch(error => {
            dispatch(failure('The user doesnt exist or doesnt match the password'));
        });
        document.body.classList.remove('busy-cursor');
    };
    
    function success(user) { return { type: 'LOGIN-SUCCESS', data: user } }
    function failure(error) { return { type: 'LOGIN-FAILURE', data: error } }
    async function getUserIdByEmail( email ){
        document.body.classList.add('busy-cursor'); 
        await axios.get(API_ROUTE + 'users.json', {headers: authHeader()})
        .then(async response => {
            await response.data.data.map( user => {
                if(user.attributes.email === email){
                    window.localStorage.setItem('user-id', user.id);
                }
            });  
        })
        .catch(error => {
            console.log(error.response);
        });
        console.log(window.localStorage);
        document.body.classList.remove('busy-cursor');
    }
}

function getUserByUsername( username ){
    
    let userExist = false;
    
    return async dispatch => {
        document.body.classList.add('busy-cursor');
        await axios.get(API_ROUTE + 'users.json', {headers: authHeader()})
        .then(response => {
            response.data.data.map( user => {
                if(user.attributes.usern === username){
                    dispatch( success( user ) );
                    userExist = true;
                }
            });
            if(!userExist)
                dispatch( failure( 'The user doesnt exist' ) );
        })
        .catch(error => {
            dispatch( failure( error.response ) );
        });
        document.body.classList.remove('busy-cursor');
    };
    
    function success(user) { return { type: 'GET-USER-SUCCESS', data: user } }
    function failure(error) { return { type: 'GET-USER-FAILURE', data: error } }
}

function logout(){
    window.localStorage.removeItem('user');
    //window.localStorage.removeItem('user-id');
    return({
        type: 'LOGOUT-SUCCESS'
    });
}

function signUp(user){
    
    return async dispatch => {
        
        const newUser = {
            "user": {
                ...user
            }
        };
        
        document.body.classList.add('busy-cursor');
        await axios.post(API_ROUTE + 'users', newUser)
        .then(response => {
            dispatch(success('User added succesfully'));
            dispatch( login( user ) );
        })
        .catch(error => {
            dispatch(failure(error.response));
        });
        document.body.classList.remove('busy-cursor');
    };    
    
    function success(message) { return { type: 'SIGNUP-SUCCESS', data: message } }
    function failure(error) { return { type: 'SIGNUP-FAILURE', data: error } }
    
}