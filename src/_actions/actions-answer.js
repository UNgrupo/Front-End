import Common from './actions-common';

const element = 'answers';
const commonActions = new Common(element);

const answerActions = {
    ...commonActions.getActions
};

export default answerActions;
