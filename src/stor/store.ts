import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { rootReducer } from './reducers';

const composeEnhancers = composeWithDevTools({ trace: true });

const enhancer = composeEnhancers(applyMiddleware(
  thunkMiddleware,
));

export const initStore = (initialState = {}) => createStore(rootReducer, initialState, enhancer);
