import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLogin: false,
	user: null,
	userToken: null,
	user_addresses: [],
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		handleLogin2: (state, action) => {
			console.log("payloaddata", action.payload);
			state.isLogin = true;
			state.user = action.payload.userdata;
			state.userToken = action.payload.token;

			// if (action.payload.login === true) {
			// 	state.isLogin == action.payload.login;
			// 	state.user == action.payload.userdata;
			// }
		},
		tokenLogin: (state, action) => {
			console.log("payload", action.payload);
			let onlyAddress = action?.payload?.address?.map((user) => {
				const obj = { ...user };
				delete obj.user;
				return obj;
			});
			console.log("addressData", onlyAddress);
			state == { ...state, isLogin: true };
			state.isLogin = true;
			state.user = action.payload.data;
			state.user_addresses = onlyAddress;
			// return {
			// 	...state,
			// 	user_addresses: onlyAddress,
			// };
		},
	},
});
export const { handleLogin2, tokenLogin } = authSlice.actions;
export default authSlice.reducer;
