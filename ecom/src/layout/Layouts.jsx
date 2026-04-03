import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";
// import SideBar from "../Pages/SideBar";
const Layout = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<Navbar setIsOpen={setIsOpen} />
			<CategoryBar />

			{/*  THIS FIXES YOUR ISSUE */}
			<div className="flex-grow">
				<Outlet />
			</div>

			<Footer />
		</div>
	);
};

export default Layout;
