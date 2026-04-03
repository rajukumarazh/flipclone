import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminLayout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		localStorage.removeItem("tkn");
		//dispatch({ type: "auth/logout" });
		navigate("/");
	};

	const menu = [
		{ name: "Dashboard", path: "/admin" },
		{ name: "Products", path: "/admin/products" },
		{ name: "Orders", path: "/admin/orders" },
		{ name: "Users", path: "/admin/users" },
	];

	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* 🔵 Sidebar */}
			<div className="w-64 bg-white shadow-md p-1">
				<h2 className="text-xl font-bold mb-4 text-blue-600">
					Admin Panel
				</h2>

				<nav className="flex flex-col gap-2">
					{menu.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							className={({ isActive }) =>
								`p-2 rounded ${
									isActive
										? "bg-blue-600 text-white"
										: "text-gray-700 hover:bg-gray-200"
								}`
							}>
							{item.name}
						</NavLink>
					))}
				</nav>

				{/* Logout */}
				<button
					onClick={handleLogout}
					className="mt-6 w-full bg-red-500 text-white py-2 rounded">
					Logout
				</button>
			</div>

			{/* 🟢 Main Content */}
			<div className="flex-1 p-1">
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;
