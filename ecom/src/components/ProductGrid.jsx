import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/Thunk/ProductThunk";

const ProductGrid = ({ products }) => {
	const dispatch = useDispatch();
	const { items, loading } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	async function getProductData() {
		const prdtData = await axios.get("https://fakestoreapi.com/products");

		if (prdtData) {
			setData(prdtData?.data);
		}
	}

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
