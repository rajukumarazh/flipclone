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
			console.log("tokenData", action.payload);
			if (action.payload !== undefined) {
				// state == { ...state, isLogin: true };
				state.isLogin = true;
				state.user = action.payload.data;
				state.user_addresses = action.payload.address;
			}
		},
	},
});
export const { handleLogin2, tokenLogin } = authSlice.actions;
export default authSlice.reducer;
