import HeroBanner from "../components/HeroBanner";
import ProductGrid from "../components/ProductGrid";
import FilterSideBar from "../components/FilterSidebar";
import HeroCarousel from "../components/HeroCarousel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
	const logindata = useSelector((state) => state?.auth);
	const navigate = useNavigate();
	console.log("logindata", logindata);
	useEffect(() => {
		if (logindata?.user?.role === "admin") {
			navigate("/admin");
		}
	}, []);
	return (
		<div className="bg-gray-100">
			{/* Hero Section */}
			<HeroCarousel />
			{/* <FilterSideBar /> */}
			{/* Trending Section */}
			<section className="max-w-7xl mx-auto px-4 mt-8">
				<div className="bg-white p-6 rounded shadow">
					<h2 className="text-xl font-semibold mb-6">
						Trending Products
					</h2>
					<ProductGrid />
				</div>
			</section>

			{/* Best Deals Section */}
			<section className="max-w-7xl mx-auto px-4 mt-8">
				<div className="bg-white p-6 rounded shadow">
					<h2 className="text-xl font-semibold mb-6">
						Best Deals
					</h2>
					<ProductGrid />
				</div>
			</section>

			{/* Recommended Section */}
			<section className="max-w-7xl mx-auto px-4 mt-8 pb-10">
				<div className="bg-white p-6 rounded shadow">
					<h2 className="text-xl font-semibold mb-6">
						Recommended For You
					</h2>
					<ProductGrid />
				</div>
			</section>
		</div>
	);
};

export default Home;
