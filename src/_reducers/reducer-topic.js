const initial_state ={
    success: false,
    data: {}
};

const topicReducer = function( state = initial_state, action ){
    const {type, data} = action;
    
    switch(type){
        case 'GET-TOPICS-SUCCESS':
            return data;
        case 'GET-TOPICS-FAILURE':
            return [];
        case 'GET-TOPIC-SUCCESS':
            return data;
        case 'GET-TOPIC-FAILURE':
            return data;
        case 'DELETE-TOPIC-SUCCESS':
            return data;
        case 'DELETE-TOPIC-FAILURE':
            return data;
        case 'ADD-TOPIC-SUCCESS':
            return {
                success: true,
                data
            };
        case 'ADD-TOPIC-FAILURE':
            return {
                success: false,
                data
            };
        case 'UPDATE-TOPIC-SUCCESS':
            return data;
        case 'UPDATE-TOPIC-FAILURE':
            return data;
        default:
            return state;
    }
};

export default topicReducer;