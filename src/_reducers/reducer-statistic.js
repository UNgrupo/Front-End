const initial_state = {
    success: false,
    data: ''
};

export default function statisticReducer( state = initial_state, action ){
    const {type, data} = action;
    
    switch( type ){
        case 'GET-STATISTICS-SUCCESS':
            return {
                success: true,
                data
            };
        case 'GET-STATISTICS-FAILURE':
            return {
                success: false,
                data
            };
        case 'GET-STATISTIC-SUCCESS':
            return {
                success: true,
                data
            };
        case 'GET-STATISTIC-FAILURE':
            return {
                success: false,
                data
            };
        case 'DELETE-STATISTIC-SUCCESS':
            return {
                success: true,
                data
            };
        case 'DELETE-STATISTIC-FAILURE':
            return {
                success: false,
                data
            };
        case 'ADD-STATISTIC-SUCCESS':
            return {
                success: true,
                data
            };
        case 'ADD-STATISTIC-FAILURE':
            return {
                success: false,
                data
            };
        case 'UPDATE-STATISTIC-SUCCESS':
            return {
                success: true,
                data
            };
        case 'UPDATE-STATISTIC-FAILURE':
            return {
                success: false,
                data
            };
        default:
            return state;
    }
}
