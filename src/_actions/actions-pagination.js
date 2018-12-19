const paginationActions = {
    setPage
};

export default paginationActions;

function setPage( data ){
    return async dispatch => {
        await dispatch( success( data ) );
    };

    function success( data ){ return { type: 'PAGINATION-SUCCESS', data } };
}