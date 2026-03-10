import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addToCart } from "../features/products/productSlice";
import CartToast from "../components/CartToast";
import { useState } from "react";
const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [showToast, setShowToast] = useState(false);
	const products = useSelector((state) => state.products.allProducts);
	const cart = useSelector((state) => state.products.cart);
	//const allproduct = useSelector((state) => state.products);
	const product = products?.find((item) => item.id === Number(id));
	let currentCartProduct = cart?.find((item) => item.id == Number(id));
	// console.log("currerent", currentCartProduct);
	// console.log("ccc", products);
	const handleCartItem = () => {
		dispatch(addToCart(product));
		setShowToast(true);
	};
	return (
		<div className="max-w-7xl mx-auto px-4 py-8 bg-white">
			<div className="grid md:grid-cols-2 gap-8">
				<div className="h-80 flex items-center justify-center">
					<img
						src={product?.image}
						className="h-full object-contain"
					/>
				</div>
				<CartToast
					show={showToast}
					onClose={() => setShowToast(false)}
				/>
				<div>
					<h1 className="text-2xl font-semibold">
						{product?.title}
					</h1>

					<div className="mt-4 text-3xl font-bold text-gray-800">
						₹{product?.price}
					</div>

					<div className="mt-6 flex gap-4">
						{currentCartProduct == undefined ? (
							<button
								className="bg-yellow-400 px-6 py-3 rounded font-medium"
								onClick={handleCartItem}>
								Add to Cart
							</button>
						) : (
							<Link
								to={"/cart"}
								className="bg-yellow-400 px-6 py-3 rounded font-medium"
								// onClick={handleCartItem}
							>
								Go to Cart
							</Link>
						)}

						<Link
							to={"/checkout"}
							className="bg-orange-500 text-white px-6 py-3 rounded font-medium">
							Buy Now
						</Link>
					</div>

					<p className="mt-6 text-gray-600">
						{product?.description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
