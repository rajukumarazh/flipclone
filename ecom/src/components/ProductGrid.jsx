import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/Thunk/ProductThunk";
/// api for products https://fakestoreapi.com/products
const ProductGrid = ({ products }) => {
	//const [data, setData] = useState();

	console.log("products", products);
	const dispatch = useDispatch();
	const { items, loading } = useSelector((state) => state.products);
	//console.log("itemtoolkit", items);
	useEffect(() => {
		dispatch(fetchProducts());
		// getProductData();
	}, [dispatch]);
	// useEffect(() => {
	// 	getProductData();
	// }, []);
	async function getProductData() {
		const prdtData = await axios.get("https://fakestoreapi.com/products");
		// console.log("datattt", prdtData);
		if (prdtData) {
			setData(prdtData?.data);
		}
	}
	// const handleCheckbox = (category) => {
	// 	let updated = [...filters.categories];

	// 	if (updated.includes(category)) {
	// 		// ❌ remove
	// 		updated = updated.filter((c) => c !== category);
	// 	} else {
	// 		// ✅ add
	// 		updated.push(category);
	// 	}

	// 	setFilters({ ...filters, categories: updated });
	// };
	// const filteredProducts = products.filter((product) => {
	// 	return (
	// 		product.title.toLowerCase().includes(search.toLowerCase()) &&
	// 		(filters.categories.length === 0 ||
	// 			filters.categories.includes(product.category)) &&
	// 		(filters.price === "" || product.price <= filters.price)
	// 	);
	// });
	return (
		<div>
			{products ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					{products?.map((dt, i) => {
						return (
							<ProductCard
								key={i}
								props={dt}
							/>
						);
					})}
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					{items?.map((dt, i) => {
						return (
							<ProductCard
								key={i}
								props={dt}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ProductGrid;
