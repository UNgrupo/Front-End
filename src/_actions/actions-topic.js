import Common from './actions-common';

const element = 'topics';
const commonActions = new Common(element);

const topicActions = {
    ...commonActions.getActions
};

export default topicActions;