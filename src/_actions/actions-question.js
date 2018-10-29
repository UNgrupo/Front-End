//import commonActions from './actions-common';
import Common from './actions-common';

/*const questionActions = {
    getAll,
    getById,
    addNew,
    delete: _delete
};
const getAll = () => { commonActions.getAll( element ) }
const getById = ( id ) => { commonActions.getById( id, element ) }
const addNew = ( objectToAdd ) => { commonActions.getById( objectToAdd, element ) }
const _delete = ( id ) => { commonActions.getById( id, element ) }
*/

const element = 'questions';
const commonActions = new Common(element);

const questionActions = {
    ...commonActions.getActions
};

export default questionActions;