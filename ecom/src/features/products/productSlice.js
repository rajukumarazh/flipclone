import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../Thunk/ProductThunk";
const initialState = {
	allProducts: [],
	cart: [],
	totalAmount: 0,
};
function getTotal(currentCart) {
	return currentCart.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);
}

const productSlice = createSlice({
	name: "allproduct",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const existingProduct = state.cart.find(
				(item) => item.id === action.payload.id,
			);
			if (existingProduct) {
				existingProduct.quantity += 1;
			} else {
				state.cart.push({ ...action.payload, quantity: 1 });
			}
			state.totalAmount = getTotal(state.cart);
			console.log("total", state.totalAmount);
			// state.cart.totalAmount = state.cart?.reduce(
			// 	((acc, item) => acc + item.price * item.quantity, 0),
			// );
			// state.totalAmount = amount;
		},

		removeToCart: (state, action) => {
			const existingProduct = state.cart.find(
				(item) => item.id === action.payload.id,
			);
			state.totalAmount = getTotal(state.cart);
			if (existingProduct) {
				state.cart.pop({ ...action.payload, quantity: -1 });
			}
		},
		handleQuantityIn: (state, action) => {
			const existingProduct = state.cart.find(
				(item) => item.id === action.payload.id,
			);
			getTotal(state.cart);
			if (existingProduct) {
				existingProduct.quantity += 1;
			}
			state.totalAmount = getTotal(state.cart);
		},
		handleQuantityDec: (state, action) => {
			const existingProduct = state.cart.find(
				(item) => item.id === action.payload.id,
			);
			getTotal(state.cart);
			if (existingProduct) {
				existingProduct.quantity -= 1;
			}
			state.totalAmount = getTotal(state.cart);
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
				state.allProducts = action.payload;
			})
			.addCase(fetchProducts.rejected, (state) => {
				state.loading = false;
				state.error = "Something went wrong";
			});
	},
});
export const { addToCart, handleQuantityIn, handleQuantityDec } =
	productSlice.actions;
export default productSlice.reducer;
