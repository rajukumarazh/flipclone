import FilterSideBar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
const ProductListing = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 mt-6 flex gap-6">
			{/* Left Filter */}
			<FilterSideBar />
			{/* Right Products */}
			<div className="flex-1 bg-white p-6 rounded shadow">
				<h2 className="text-xl font-semibold mb-6">All Products</h2>
				<ProductGrid />
			</div>
		</div>
	);
};

export default ProductListing;
