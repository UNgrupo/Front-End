const initial_state = {
    logged_in: false,
    data: ''
};

const signUpReducer = function(state = initial_state, action){
    const {type, data} = action;
    
    switch(type){
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
        default:
            return state;
    }
};

export default signUpReducer;