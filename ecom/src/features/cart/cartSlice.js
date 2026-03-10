import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	cart: [],
};
const cartSlice = createSlice({
	name: "trolley",
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
		},
	},
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
