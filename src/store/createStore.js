import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {mainReducer} from './reducers';

const rootReducer = combineReducers({
  mainReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
