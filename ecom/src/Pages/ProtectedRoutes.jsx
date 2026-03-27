import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
	const token = localStorage.getItem("tkn");
	const location = useLocation();

	if (!token) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }} // 🔥 SAVE CURRENT PAGE
				replace
			/>
		);
	}

	return <Outlet />;
};

export default ProtectedRoutes;
