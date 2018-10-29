const initial_state = {
    success: false,
    data: {}
};

const questionReducer = function( state = initial_state, action ){
    const {type, data} = action;
    
    switch(type){
        case 'GET-QUESTIONS-SUCCESS':
            return data;
        case 'GET-QUESTIONS-FAILURE':
            return [];
        case 'GET-QUESTION-SUCCESS':
            return {
                success: true,
                data
            };
        case 'GET-QUESTION-FAILURE':
            return {
                success: false,
                data
            };
        case 'DELETE-QUESTION-SUCCESS':
            return {
                success: true,
                data
            };
        case 'DELETE-QUESTION-FAILURE':
            return {
                success: false,
                data
            };
        case 'ADD-QUESTION-SUCCESS':
            return {
                success: true,
                data
            };
        case 'ADD-QUESTION-FAILURE':
            return {
                success: false,
                data
            };
        case 'UPDATE-QUESTION-SUCCESS':
            return {
                success: true,
                data
            };
        case 'UPDATE-QUESTION-FAILURE':
            return {
                success: false,
                data
            };
        default:
            return state;
    }
};

export default questionReducer;