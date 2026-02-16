import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import languageReducer from './slices/languageSlice';
import purchaseReducer from './slices/purchaseSlice';
import supplierReducer from './slices/supplierSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        language: languageReducer,
        purchase: purchaseReducer,
        suppliers: supplierReducer,
    },
});
