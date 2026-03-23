import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/orders/orderSlice";
const store = configureStore({
	reducer: {
		products: productReducer,
		auth: authReducer,
		order: orderReducer,
	},
	devTools: true,
});

export default store;
