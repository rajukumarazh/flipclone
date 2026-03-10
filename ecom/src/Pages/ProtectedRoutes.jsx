import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	const token = localStorage.getItem("tkn");
	if (token == undefined) {
		return <Navigate to="/login" />;
		// if (role && user.role !== role) return <Navigate to="/" />;
	}
	return <Outlet />;
};
export default ProtectedRoutes;
