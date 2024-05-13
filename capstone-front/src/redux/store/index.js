// redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import loginSlice from '../slice/loginSlice';

const rootReducer = combineReducers({
    login: loginSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;
