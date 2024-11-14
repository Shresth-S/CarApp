import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//persisted reducer is created to store user info in local storage so that user does not fade away on refreshing

const rootReducer = combineReducers({user: userReducer });

const persistConfig = {
    key: 'root',
    storage,
    verison:1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    // by adding the below statement we will not get an error for not serializing our variables
    middleware: (getDefaultMiddleware) => 
       getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);