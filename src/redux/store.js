import filterReducer from './filters/reducer';
import loginReducer from './sesion/reducer';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';


const rootReducer = {
    filter: filterReducer,
    login: loginReducer,
};

const store = configureStore({
    reducer: rootReducer
});


export default store;