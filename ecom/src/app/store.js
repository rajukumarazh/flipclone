import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";
const store = configureStore({
	reducer: {
		products: productReducer,
		auth: authReducer,
	},
	devTools: true,
});

export default store;
