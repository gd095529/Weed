// redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import loginSlice from '../slice/loginSlice';
import loginIDReducer from '../slice/loginName';

const rootReducer = combineReducers({
    login: loginSlice,
    loginID: loginIDReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login', 'loginID']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
