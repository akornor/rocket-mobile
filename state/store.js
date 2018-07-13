/* eslint-disable global-require */
/* eslint-disable no-undef */
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './rootReducer';
import initialState from './initialState';

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk, logger),
    autoRehydrate(),
  ),
);
persistStore(store, { storage: AsyncStorage }, () => {
  console.log('persist store');
});
export default store;
