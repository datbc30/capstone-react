import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducer/productReducer';
import useReducer from './reducer/useReducer';


export const store = configureStore({
    reducer: {
        productReducer:productReducer,
        useReducer:useReducer
    }
});