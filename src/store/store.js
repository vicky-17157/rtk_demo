import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import userReducer, { userSlice } from './userSlice';
// import authReducer from './authReducer';
// import userReducer from './userSlice'
const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        user: userSlice.reducer,
    },
});

export default store;