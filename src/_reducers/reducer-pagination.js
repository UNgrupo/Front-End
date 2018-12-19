const initialState = {
    data: []
};

const paginationReducer = function( state = initialState, action ){
    const { type, data } = action;

    switch(type){
        case 'PAGINATION-SUCCESS':
            return data;
        default:
            return state;
    }
}

export default paginationReducer;