import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	myOrder: [],
};
const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		handleMyorder: (state, action) => {
			console.log("myoderderAction", action.payload);
			state.myOrder = action.payload;
		},
	},
});
export const { handleMyorder } = orderSlice.actions;
export default orderSlice.reducer;
