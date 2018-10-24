import api_route from '../route';
import axios from 'axios';

const userActions = {
    getAll,
    login,
    getUser,
    logout,
    signUp
};

export default userActions;

function getAll(){
    
    return dispatch => {
        document.body.classList.add('busy-cursor');
        axios.get(api_route + '/users')
        .then(response => {
            dispatch(success(response.data.data));
        })
        .catch(error => {
            dispatch(failure(error.message));
        });
        document.body.classList.remove('busy-cursor');
    };
    
    function success(users) { return { type: 'GET-USERS-SUCCESS', data: users } }
    function failure(error) { return { type: 'GET-USERS-FAILURE', data: error } }
}

function login(users, username, password){
    let user;
    
    for(let i=0; i<users.length; i++){
      if(users[i].attributes.usern === username){
        if(users[i].attributes.password === password){
            user = users[i];
            window.localStorage.setItem('user', user);
            window.location.href = "/home";         
        }
        break;
      }
    }
    
    return dispatch => {
        (user ? dispatch(success(user)) : dispatch(failure('login failure')));
    };
    
    function success(users) { return { type: 'LOGIN-SUCCESS', data: users } }
    function failure(error) { return { type: 'LOGIN-FAILURE', data: error } }
}

async function getUser(id){
    const user = await axios.get(api_route + 'users/' + id);
    return({
        type: 'GET-USER',
        data: user
    });
}

function logout(){
    window.localStorage.removeItem('user');
    return({
        type: 'LOGOUT-SUCCESS'
    });
}

function signUp(user, users){
    
    const {email, usern} = user;
    
    return dispatch => {
        
        let already_exist = false;
        
        for(let i=0; i<users.length; i++){
            if( users[i].attributes.email == email ){
                dispatch(failure('The email has been used already'));
                already_exist = true;
                break;
            } else if( users[i].attributes.usern == usern ){
                dispatch(failure('The username its not availible'));
                already_exist = true;
            }
        }
        
        if( !already_exist ){
            document.body.classList.add('busy-cursor');
            axios.post(api_route + 'users', user)
            .then(response => {
                dispatch(success('User added succesfully'));
                window.localStorage.setItem('user', user);
                window.location.href = "/home";
            })
            .catch(error => {
                dispatch(failure(error.message));
            });
            document.body.classList.remove('busy-cursor');
        }
    
    function success(message) { return { type: 'SIGNUP-SUCCESS', data: message } }
    function failure(error_message) { return { type: 'SIGNUP-FAILURE', data: error_message } }
    
    };
}