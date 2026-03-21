import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { IoCartOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
	let cart = useSelector((state) => state?.products?.cart);
	const curentUser = useSelector((state) => state?.auth);
	console.log("currentUser", curentUser);
	const userToken = localStorage.getItem("tkn");
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	//console.log("openstatus", open);
	// useEffect(() => {
	// 	const handleClickOutside = (e) => {
	// 		if (!e.target.closest(".profile-dropdown")) {
	// 			setOpen(false);
	// 		}
	// 	};
	// 	document.addEventListener("click", handleClickOutside);
	// 	return () =>
	// 		document.removeEventListener("click", handleClickOutside);
	// }, []);

	const handleLogout = () => {
		localStorage.removeItem("tkn");
		setOpen(!open);
		alert("sucessfully logout");
		navigate("/login");
	};

	return (
		<nav className="bg-blue-600 text-white sticky top-0 z-50 shadow">
			<div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
				{/* Logo */}
				<Link
					to="/"
					className="text-xl font-bold">
					Flipclone
				</Link>

				{/* Right Menu */}
				<div className="flex items-center gap-6 text-sm font-medium relative">
					{!userToken && userToken !== null ? (
						<Link
							to="/login"
							className="hidden md:block bg-white text-blue-600 px-5 py-1 rounded">
							Login
						</Link>
					) : (
						<div className="relative">
							{/* Profile Icon */}
							<IoPersonCircleOutline
								size={30}
								className="cursor-pointer"
								onClick={() => setOpen(!open)}
							/>

							{/* Dropdown */}
							{open && (
								<div className=" profile-dropdown absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg py-2">
									<p className="text-center text-red-600 px-2 py-1 underline">
										Hi{" "}
										{curentUser?.user
											? curentUser?.user.name
											: "not found"}
									</p>
									<button
										onClick={() => {
											navigate("/profile");
											setOpen(!open);
										}}
										className="block w-full text-left px-4 py-2 hover:bg-gray-100">
										My Profile
									</button>
									<button
										onClick={() => {
											setOpen(!open);
											navigate("/order");
										}}
										className="block w-full text-left px-4 py-2 hover:bg-gray-100">
										My Orders
									</button>
									<button
										onClick={() => {
											setOpen(!open);
											handleLogout();
										}}
										className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
										Logout
									</button>
								</div>
							)}
						</div>
					)}

					{/* Cart */}
					<Link
						to="/cart"
						className="relative flex items-center">
						<IoCartOutline size={26} />
						{cart.length > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
								{cart.length}
							</span>
						)}
					</Link>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
