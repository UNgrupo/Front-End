import Common from './actions-common';

const element = 'subjects';
const commonActions = new Common(element);

const subjectActions = {
    ...commonActions.getActions
};

export default subjectActions;