import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/Thunk/ProductThunk";
/// api for products https://fakestoreapi.com/products
const ProductGrid = () => {
	//const [data, setData] = useState();
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

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{/* {Array(10)
				.fill(0)
				.map((_, i) => (
					<ProductCard key={i} />
				))} */}
			{items?.map((dt, i) => {
				return (
					<ProductCard
						key={i}
						props={dt}
					/>
				);
			})}
		</div>
	);
};

export default ProductGrid;
