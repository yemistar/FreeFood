import { combineReducers } from 'redux';

import user from './user';

const rootReducer = (state, action) => {
  // todo handle actions such as logout/reset here
  return appReducer(state, action);
}

const appReducer = combineReducers({
  user
});

export default rootReducer;
