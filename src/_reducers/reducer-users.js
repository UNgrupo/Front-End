const initial_state = [];

const usersReducer = function(state = initial_state, action){
    
    const {type, data} = action;
    switch(type){
        case 'GET-USERS':
            return data;
        default:
            return state;
    }
    
};

export default usersReducer;