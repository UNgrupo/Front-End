const initial_state = {
    success: false,
    data: {}
};

const answerReducer = function( state = initial_state, action ){
    const {type, data} = action;
    
    switch(type){
        case 'GET-ANSWERS-SUCCESS':
            return data;
        case 'GET-ANSWERS-FAILURE':
            return [];
        case 'GET-ANSWER-SUCCESS':
            return data;
        case 'GET-ANSWER-FAILURE':
            return data;
        case 'DELETE-ANSWER-SUCCESS':
            return data;
        case 'DELETE-ANSWER-FAILURE':
            return data;
        case 'ADD-ANSWER-SUCCESS':
            return {
                success: true,
                data
            };
        case 'ADD-ANSWER-FAILURE':
            return {
                success: false,
                data
            };
        case 'UPDATE-ANSWER-SUCCESS':
            return state;
        case 'UPDATE-ANSWER-FAILURE':
            return data;
        default:
            return state;
    }
};

export default answerReducer;