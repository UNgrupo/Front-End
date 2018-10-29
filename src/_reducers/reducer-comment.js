const initial_state = {
    success: false,
    data: {}
};

const commentReducer = function( state = initial_state, action ){
    const {type, data} = action;
    
    switch(type){
        case 'GET-COMMENTS-SUCCESS':
            return data;
        case 'GET-COMMENTS-FAILURE':
            return [];
        case 'GET-COMMENT-SUCCESS':
            return data;
        case 'GET-COMMENT-FAILURE':
            return data;
        case 'DELETE-COMMENT-SUCCESS':
            return data;
        case 'DELETE-COMMENT-FAILURE':
            return data;
        case 'ADD-COMMENT-SUCCESS':
            return {
                success: true,
                data
            };
        case 'ADD-COMMENT-FAILURE':
            return {
                success: false,
                data
            };
        case 'UPDATE-COMMENT-SUCCESS':
            return data;
        case 'UPDATE-COMMENT-FAILURE':
            return data;
        default:
            return state;
    }
};

export default commentReducer;