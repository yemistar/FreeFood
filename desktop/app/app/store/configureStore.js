import { createStore, applyMiddleware, compose } from 'redux';
//import { autoRehydrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger';

import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const middlewares = [];

// Only use redux-logger in development
//process.env.NODE_ENV === 'development' ? middlewares.push(logger) : null;

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, compose(applyMiddleware(...middlewares)))
  let persistor = persistStore(store)
  return { store, persistor }
}
