const initial_state = {
    success: false,
    data: {}
};

const userReducer = function(state = initial_state, action){
    const {type, data} = action;
    
    switch(type){
        case 'GET-USERS-SUCCESS':
            return data;
        case 'GET-USERS-FAILURE':
            return [];
        case 'GET-USER-SUCCESS':
            return data;
        case 'GET-USER-FAILURE':
            return state;
        case 'DELETE-USER-SUCCESS':
            return data;
        case 'DELETE-USER-FAILURE':
            return data;
        case 'UPDATE-USER-SUCCESS':
            return data;
        case 'UPDATE-USER-FAILURE':
            return data;
        default:
            return state;
    }
};

export default userReducer;