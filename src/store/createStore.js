import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import defaultReducer from './reducers';

const rootReducer = combineReducers({
  defaultReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
