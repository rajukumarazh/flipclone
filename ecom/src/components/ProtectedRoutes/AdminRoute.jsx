import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
	const token = localStorage.getItem("tkn");
	const user = useSelector((state) => state.auth.user);

	if (!token) return <Navigate to="/login" />;

	if (user?.role !== "admin") {
		return <Navigate to="/" />; // ❌ block user
	}

	return <Outlet />;
};
export default AdminRoute;
