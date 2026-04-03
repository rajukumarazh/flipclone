import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
	const navigate = useNavigate();
	const [signup, setSignup] = useState({
		name: "",
		email: "",
		password: "",
		role: "user",
	});
	console.log("signup", signup);
	async function register() {
		let registerData = await axios.post(
			"http://localhost:5000/api/signup",
			signup,
		);
		console.log("helloRegister", registerData);
		if (registerData?.data) {
			navigate("/");
		}
	}
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-full max-w-4xl">
				{/* Left Side */}
				<div className="bg-blue-600 text-white p-8 w-1/2 hidden md:flex flex-col justify-center">
					<h2 className="text-3xl font-bold mb-4">
						Looks like you're new here!
					</h2>
					<p className="text-sm">
						Sign up with your email to get started
					</p>
				</div>

				{/* Right Side */}
				<div className="w-full md:w-1/2 p-8">
					<input
						onChange={(e) =>
							setSignup({
								...signup,
								name: e.target.value,
							})
						}
						type="text"
						placeholder="Enter Full Name"
						className="w-full border-b p-3 outline-none mb-6"
					/>

					<input
						onChange={(e) =>
							setSignup({
								...signup,
								email: e.target.value,
							})
						}
						type="email"
						placeholder="Enter Email"
						className="w-full border-b p-3 outline-none mb-6"
					/>

					<input
						onChange={(e) =>
							setSignup({
								...signup,
								password: e.target.value,
							})
						}
						type="password"
						placeholder="Enter Password"
						className="w-full border-b p-3 outline-none mb-6"
					/>

					<button
						onClick={() => register()}
						className="w-full bg-orange-500 text-white py-3 rounded font-semibold">
						Continue
					</button>

					<Link
						to="/login"
						className="text-center text-sm mt-6 text-blue-600 cursor-pointer">
						Existing User? Log in
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;
