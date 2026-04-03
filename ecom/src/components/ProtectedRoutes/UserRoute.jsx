const UserRoute = () => {
	const token = localStorage.getItem("tkn");
	const user = useSelector((state) => state.auth.user);

	if (!token) return <Navigate to="/login" />;

	if (user?.role !== "user") {
		return <Navigate to="/admin" />; // ❌ block admin
	}

	return <Outlet />;
};

export default UserRoute;
