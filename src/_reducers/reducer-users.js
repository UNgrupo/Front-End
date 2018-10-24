const initial_state = [];

const usersReducer = function(state = initial_state, action){
    
    const {type, data} = action;
    switch(type){
        case 'GET-USERS-SUCCESS':
            return data;
        case 'GET-USERS-FAILURE':
            console.log(data);
            return [];
        default:
            return state;
    }
    
};

export default usersReducer;