import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whiteList: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore(
    {reducer:persistedReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        })},
    
    composeWithDevTools(applyMiddleware(thunk))
)

export const persistor = persistStore(store)
