import api_route from '../route';
import axios from 'axios';

export const userActions = {
    getAll,
    login,
    getUser,
    logout,
    signup
}

async function getAll(){
    const users = await axios.get(api_route + 'users');
    return({
        type: 'GET-USERS',
        data: users
    });
}

function login(username, password){
    return({
        type: 'LOGIN-USER',
        data: {
            logIn: true,
            username
        }
    });
}

async function getUser(id){
    const user = await axios.get(api_route + 'users/' + id);
    return({
        type: 'GET-USER',
        data: user
    });
}

function logout(){
    return({
        type: 'LOGOUT-USER',
        data: {
            logIn: false,
            username: ''
        }
    });
}

async function signup(username, password, email){
    const user = await axios.post(api_route + 'users', {username, password, email});
    return({
        type: 'LOGIN-USER',
        data: {
            loggingIn: true,
            username
        }
    });
}