import Common from './actions-common';

const element = 'questions';
const commonActions = new Common(element);

const questionActions = {
    ...commonActions.getActions
};

export default questionActions;