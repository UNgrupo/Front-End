const initial_state = {
    success: false,
    data: {}
};

const photoReducer = function( state = initial_state, action ){
    const {type, data} = action;

    switch(type){
        case 'GET-PHOTOS-SUCCESS':
            return data;
        case 'GET-PHOTOS-FAILURE':
            return data;
        default:
            return initial_state;
    }
};

export default photoReducer;