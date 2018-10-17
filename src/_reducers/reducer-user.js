const initial_state = {
    logged_in: false,
    username: "",
    id: 0
};

const userReducer = function(state = initial_state, action){
    const {type, data} = action;
    
    switch(type){
        case 'GET-USER':
            return state;
        case 'LOGIN-USER':
            return({
                logged_in: true,
                username: data.name,
                id: data.id
            });
        case 'LOGOUT-USER':
            return initial_state;
        default:
            return state;
    }
};

export default userReducer;