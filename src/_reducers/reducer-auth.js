const initial_state = {
    logged_in: false,
    data: Object,
    loginSocial: false
}

const authenticationReducer = function(state = initial_state, action){
    const {type, data} = action;
    
    switch(type){
        case 'LOGIN-SUCCESS':
            return({
                logged_in: true,
                data
            });
        case 'LOGIN-SUCCESS-SOCIAL':
            return({
                logged_in: true,
                data,
                loginSocial: true
            });
        case 'LOGIN-FAILURE':
            return({
                logged_in: false,
                data
            });
        case 'SIGNUP-SUCCESS':
            return({
                logged_in: true,
                data
            });
        case 'SIGNUP-FAILURE':
            return({
                logged_in: false,
                data
            });
        case 'LOGOUT-SUCCESS':
            return initial_state;
        default:
            return state;
    }
};

export default authenticationReducer;