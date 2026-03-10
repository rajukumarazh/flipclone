import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layouts";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./Pages/ProductDetails";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import Cart from "./Pages/Cart";
import Profile from "./pages/Profile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminPanel from "./Pages/AdminPanel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MyOrders from "./Pages/MyOrders";
import Checkout from "./Pages/Checkout";
import Payment from "./Pages/Payment";
import axios from "axios";
import { handleLogin2, tokenLogin } from "./features/auth/authSlice";
function App() {
	// const pd = useSelector((state) => state?.products?.allProducts);
	const [islogin, setIslogin] = useState(false);
	let token = localStorage.getItem("tkn");
	const dispatch = useDispatch();
	useEffect(() => {
		CheckinLoginUser();
	}, []);

	async function CheckinLoginUser() {
		let currentUser = await axios.get(
			"http://localhost:5000/api/islogin",
			{
				headers: {
					Authorization: `${token}`,
				},
			},
		);

		let add2 = await axios.post(
			"http://localhost:5000/api/user_addresses",
			{
				user_id: currentUser?.user?._id,
			},
		);
		let onlyAddress = await add2?.data?.map((user) => {
			const obj = { ...user };
			delete obj.user;
			return obj;
		});
		console.log("app.js", currentUser);
		//console.log("address", add);
		if (currentUser?.data?.name) {
			dispatch(
				tokenLogin({
					data: currentUser.data,
					address: onlyAddress,
				}),
			);
		}
		// .then((res) => console.log("res", res.data))
		// .catch((err) => console.log("error", err));
	}
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/products"
						element={<ProductListing />}
					/>
					<Route
						// path="/product/:id"
						path="details/:id"
						element={<ProductDetails />}
					/>
					<Route
						path="/cart"
						element={<Cart />}
					/>
					<Route element={<ProtectedRoutes />}>
						<Route
							path="/checkout"
							element={<Checkout />}
						/>
						<Route
							path="/profile"
							element={<Profile />}
						/>
						<Route
							path="/order"
							element={<MyOrders />}
						/>
						<Route
							path="/payment"
							element={<Payment />}
						/>
					</Route>
					{/* element=
					{
						<ProtectedRoute role="admin">
							<Admin />
						</ProtectedRoute>
					} */}

					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/signup"
						element={<Signup />}
					/>
					<Route
						path="/admin"
						element={<AdminPanel />}
					/>
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
