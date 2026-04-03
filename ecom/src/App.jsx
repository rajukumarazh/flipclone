import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layouts";
import Home from "./Pages/Home";
// import Home from "./pages/Home";
// import ProductListing from "./pages/ProductListing";
import AdminLayout from "./components/Admin/AdminLayout";
import ProductListing from "./Pages/ProductListing";
import ProductDetails from "./Pages/ProductDetails";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
// import Profile from "./pages/Profile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminPanel from "./components/Admin/AdminPanel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MyOrders from "./Pages/MyOrders";
import Checkout from "./Pages/Checkout";
import PaymentSuccess from "./Pages/PaymentSuccess";
import Payment from "./Pages/Payment";
import axios from "axios";
import Orders from "./Pages/Orders";
import { handleLogin2, tokenLogin } from "./features/auth/authSlice";
import OrderDetails from "./components/OrderDetails";
import { useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import { useNavigate } from "react-router-dom";
import Order from "./components/Admin/AdminOrders";

import AdminOrders from "./components/Admin/AdminOrders";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminDashboard from "./components/Admin/AdminDashboard";
function App() {
	const pd = useSelector((state) => state?.auth?.user);
	const location = useLocation();
	const navigate = useNavigate();
	const [islogin, setIslogin] = useState(false);
	let token = localStorage.getItem("tkn");
	const [authLoading, setAuthLoading] = useState(true);
	const dispatch = useDispatch();
	console.log("pd", pd);
	useEffect(() => {
		CheckinLoginUser();
		if (pd?.role === "admin" && location.pathname === "/") {
			navigate("/admin", { replace: true });
		}
	}, [token]);
	//console.log("tokkken", token);
	async function CheckinLoginUser() {
		try {
			if (token !== null) {
				let currentUser = await axios.get(
					"http://localhost:5000/api/islogin",
					{
						headers: {
							Authorization: `${token}`,
							//Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEiLCJlbWFpbCI6InIiLCJpYXQiOjE3NzMyNzk0ODAsImV4cCI6MTc3MzM2NTg4MH0.9j2CyHm5n6AUKLyZMRumzkTbslzOfcZgo7rohDtFKbU`,
						},
					},
				);
				//console.log("curccc", currentUser);
				if (currentUser?.data?._id) {
					dispatch(
						tokenLogin({
							data: currentUser.data,
						}),
					);
				}

				let add2 = await axios.post(
					"http://localhost:5000/api/user_addresses",
					{
						user: currentUser?.data?._id,
					},
				);
				//	console.log("kraju", add2);
				let onlyAddress = await add2?.data?.map((user) => {
					const obj = { ...user };
					delete obj.user;
					return obj;
				});

				if (currentUser?.data?._id) {
					dispatch(
						tokenLogin({
							data: currentUser.data,
							address: onlyAddress,
							//address: add2?.data,
						}),
					);
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setAuthLoading(false);
		}
	}
	if (authLoading) {
		return <Loader />;
	}
	// console.log("pppp", pd);
	return (
		<Routes>
			<Route element={<Layout />}>
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
			</Route>
			{/* 🟢 USER APP */}
			<Route element={<ProtectedRoutes role="user" />}>
				<Route element={<Layout />}>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/products"
						element={<ProductListing />}
					/>
					<Route
						path="/cart"
						element={<Cart />}
					/>
					<Route
						path="/profile"
						element={<Profile />}
					/>
					<Route
						// path="/product/:id"
						path="details/:id"
						element={<ProductDetails />}
					/>
					<Route
						// path="/product/:id"
						path="orderdetails/:id"
						element={<OrderDetails />}
					/>
					<Route
						path="/cart"
						element={<Cart />}
					/>
					<Route
						path="/order"
						element={<MyOrders />}
					/>

					<Route
						path="/success"
						element={<PaymentSuccess />}
					/>
					<Route
						path="/orders"
						element={<Orders />}
					/>
					<Route
						path="/payment"
						element={<Payment />}
					/>
					<Route
						path="/checkout"
						element={<Checkout />}
					/>
				</Route>
			</Route>

			{/* ADMIN APP ( SEPARATE) */}
			<Route element={<ProtectedRoutes role="admin" />}>
				<Route element={<AdminLayout />}>
					<Route
						path="/admin"
						element={<AdminDashboard />}
					/>
					<Route
						path="/admin/products"
						element={<AdminPanel />}
					/>
					<Route
						path="/admin/orders"
						element={<AdminOrders />}
					/>
					<Route
						path="/admin/users"
						element={<AdminUsers />}
					/>
				</Route>
			</Route>

			{/*  PUBLIC */}
			<Route
				path="/login"
				state={{ from: location }}
				element={<Login />}
				replace
			/>
			{/* <Route
				path="/"
				element={<Home />}
			/> */}

			<Route
				path="/signup"
				element={<Signup />}
			/>
		</Routes>
		// <BrowserRouter>
		// <Layout>
		// 	<Routes>
		// 		<Route
		// 			path="/"
		// 			element={<Home />}
		// 		/>
		// 		<Route
		// 			path="/products"
		// 			element={<ProductListing />}
		// 		/>
		// 		<Route
		// 			// path="/product/:id"
		// 			path="details/:id"
		// 			element={<ProductDetails />}
		// 		/>
		// 		<Route
		// 			// path="/product/:id"
		// 			path="orderdetails/:id"
		// 			element={<OrderDetails />}
		// 		/>
		// 		<Route
		// 			path="/cart"
		// 			element={<Cart />}
		// 		/>

		// 		<Route element={<ProtectedRoutes />}>
		// 			<Route
		// 				path="/checkout"
		// 				element={<Checkout />}
		// 				state={{ from: location }}
		// 				replace
		// 			/>
		// 			{/* <Route
		// 				path="/admin"
		// 				element={<AdminPanel />}
		// 			/> */}
		// 			<Route
		// 				path="/payment"
		// 				element={<Payment />}
		// 			/>
		// 			<Route
		// 				path="/profile"
		// 				element={<Profile />}
		// 			/>
		// 			<Route
		// 				path="/order"
		// 				element={<MyOrders />}
		// 			/>

		// 			<Route
		// 				path="/success"
		// 				element={<PaymentSuccess />}
		// 			/>
		// 			<Route
		// 				path="/orders"
		// 				element={<Orders />}
		// 			/>
		// 		</Route>
		// 		{/* element=
		// 			{
		// 				<ProtectedRoute role="admin">
		// 					<Admin />
		// 				</ProtectedRoute>
		// 			} */}

		// 		<Route
		// 			path="/login"
		// 			state={{ from: location }}
		// 			element={<Login />}
		// 			replace
		// 		/>
		// 		<Route
		// 			path="/signup"
		// 			element={<Signup />}
		// 		/>
		// 		<Route
		// 			path="/admin"
		// 			element={<AdminPanel />}
		// 		/>
		// 	</Routes>
		// </Layout>
		// </BrowserRouter>
	);
}

export default App;
