const initial_state = {
    success: false,
    data: {}
};

const subjectReducer = function( state = initial_state, action ){
    const {type, data} = action;
    
    switch(type){
        case 'GET-SUBJECTS-SUCCESS':
            return data;
        case 'GET-SUBJECTS-FAILURE':
            return [];
        case 'GET-SUBJECT-SUCCESS':
            return data;
        case 'GET-SUBJECT-FAILURE':
            return data;
        case 'DELETE-SUBJECT-SUCCESS':
            return data;
        case 'DELETE-SUBJECT-FAILURE':
            return data;
        case 'ADD-SUBJECT-SUCCESS':
            return {
                success: true,
                data
            };
        case 'ADD-SUBJECT-FAILURE':
            return {
                success: false,
                data
            };
        case 'UPDATE-SUBJECT-SUCCESS':
            return data;
        case 'UPDATE-SUBJECT-FAILURE':
            return data;
        default:
            return state;
    }
};

export default subjectReducer;