import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ role }) => {
	const { user } = useSelector((state) => state.auth);
	const token = localStorage.getItem("tkn");

	// ❌ not logged in
	if (!token || !user) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	// ❌ role mismatch
	if (role && user.role !== role) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	// ✅ allow access
	return <Outlet />;
};

export default ProtectedRoutes;
