import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin2 } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loginStatus = useSelector((state) => state.auth);
	console.log("status", loginStatus);

	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const from = location.state?.from?.pathname || "/";
	console.log("frompath", from);
	console.log("login", loginData);
	async function handleLogin() {
		try {
			let islogin = await axios.post(
				"http://localhost:5000/api/login",
				loginData,
			);

			dispatch(handleLogin2(islogin?.data));

			if (islogin?.data?.login === true) {
				localStorage.setItem("tkn", islogin?.data?.token);

				// ✅ redirect back
				navigate(from, { replace: true });
			}
		} catch (error) {
			console.error(error);
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
