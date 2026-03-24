import FilterSideBar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
const ProductListing = () => {
	let location = useLocation();
	const [filters, setFilters] = useState({
		categories: "",
		price: "",
		brand: "",
		rating: "",
	});
	const { items, loading } = useSelector((state) => state.products);
	const params = new URLSearchParams(location.search);
	const category = params.get("category") || "";

	console.log("category", filters);
	const filteredProduct = items?.filter((curr) => {
		// category
		if (category && curr.category !== category.toLowerCase())
			return false;

		// rating
		if (filters.rating && curr.rating?.rate < filters.rating)
			return false;

		// price
		if (filters.price === "Under ₹100" && curr.price >= 100) return false;

		if (
			filters.price === "₹100 - ₹500" &&
			(curr.price < 100 || curr.price > 500)
		)
			return false;

		if (filters.price === "Above ₹500" && curr.price <= 500) return false;

		return true;
	});
	console.log("filteredProduct", filteredProduct);
	return (
		<div className="max-w-7xl mx-auto px-4 mt-6 flex gap-6">
			{/* Left Filter */}
			<FilterSideBar
				filters={filters}
				setFilters={setFilters}
			/>
			{/* Right Products */}
			<div className="flex-1 bg-white p-6 rounded shadow">
				<h2 className="text-xl font-semibold mb-6">All Products</h2>
				<ProductGrid products={filteredProduct} />
			</div>
		</div>
	);
};

export default ProductListing;
