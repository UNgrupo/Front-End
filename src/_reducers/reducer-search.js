const initial_state = [];

const searchReducer = function( state = initial_state, action ){

    const { type, data } = action;

    switch( type ){
        
        case 'SUCCESS-BRING-DATA':
            return data;
        case 'FAILURE-BRING-DATA':
            return data;
        default :
            return state;

    }

}

export default searchReducer;