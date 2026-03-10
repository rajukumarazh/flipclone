import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin2 } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
	const loginStatus = useSelector((state) => state.auth);
	console.log("status", loginStatus);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	async function handleLogin() {
		let islogin = await axios.post(
			"http://localhost:5000/api/login",
			loginData,
		);
		// let add = await axios.post(
		// 	"http://localhost:5000/api/user_addresses",
		// 	{
		// 		user_id: "69a1b2e11a878ced01e3f469",
		// 	},
		// );

		// console.log("address", add);
		dispatch(handleLogin2(islogin?.data));
		navigate("/");

		if (islogin) {
			localStorage.setItem("tkn", islogin.data.token);
			console.log("address", add);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-full max-w-4xl">
				{/* Left Side */}
				<div className="bg-blue-600 text-white p-8 w-1/2 hidden md:flex flex-col justify-center">
					<h2 className="text-3xl font-bold mb-4">Login</h2>
					<p className="text-sm">
						Get access to your Orders, Wishlist and
						Recommendations
					</p>
				</div>

				{/* Right Side */}
				<div className="w-full md:w-1/2 p-8">
					<input
						onChange={(e) =>
							setLoginData({
								...loginData,
								email: e.target.value,
							})
						}
						type="text"
						placeholder="Enter Email / Mobile number"
						className="w-full border-b p-3 outline-none mb-6"
					/>

					<input
						onChange={(e) =>
							setLoginData({
								...loginData,
								password: e.target.value,
							})
						}
						type="password"
						placeholder="Enter Password"
						className="w-full border-b p-3 outline-none mb-6"
					/>

					<button
						onClick={() => handleLogin()}
						className="w-full bg-orange-500 text-white py-3 rounded font-semibold">
						Login
					</button>

					<Link
						to="/signup"
						className="text-center text-sm mt-6 text-blue-600 cursor-Linkointer">
						New to FlipClone? Create an account
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
