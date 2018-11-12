import Common from './actions-common';

const element = 'statistics';
const commonActions = new Common( element );

const statisticActions = {
    ...commonActions.getActions
};

export default statisticActions;