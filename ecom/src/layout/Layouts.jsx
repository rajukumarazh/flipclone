import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import { useState } from "react";
// import SideBar from "../Pages/SideBar";
const Layout = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<Navbar setIsOpen={setIsOpen} />
			<CategoryBar />
			<div className="flex-grow">{children}</div>

			<Footer />
		</div>
	);
};

export default Layout;
