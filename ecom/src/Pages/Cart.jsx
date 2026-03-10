import { useSelector, useDispatch } from "react-redux";
import {
	handleQuantityIn,
	handleQuantityDec,
} from "../features/products/productSlice";
import { Link } from "react-router-dom";
const Cart = () => {
	const dispatch = useDispatch();
	const cartData = useSelector((state) => state?.products?.cart);
	const totalAmount = useSelector((state) => state?.products?.totalAmount);
	console.log("totalAmount", totalAmount);
	let totalPrice = cartData?.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	function handleIncrement(data) {
		dispatch(handleQuantityIn({ id: data?.id, inc: 1 }));
	}
	function handleDecrement(data) {
		dispatch(handleQuantityDec({ id: data?.id, inc: 1 }));
	}
	return (
		<div className="max-w-6xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
			<h2 className="text-2xl font-semibold mb-6">
				My Cart ({cartData?.length})
			</h2>

			<div className="grid md:grid-cols-3 gap-6">
				{/* Left Side - Cart Items */}
				<div className="md:col-span-2 bg-white rounded shadow">
					{cartData?.map((item) => (
						<div
							key={item.id}
							className="flex gap-6 p-6 border-b last:border-none">
							{/* Product Image */}
							<img
								src={item.image}
								alt={item.title}
								className="w-32 h-32 object-contain"
							/>

							{/* Product Details */}
							<div className="flex-1">
								<h3 className="text-lg font-medium">
									{item.title}
								</h3>
								<p className="text-gray-600 mt-2">
									₹{item.price}
								</p>

								{/* Quantity Controls */}
								<div className="flex items-center gap-4 mt-4">
									<button
										className="border px-3 py-1"
										onClick={() =>
											handleDecrement(item)
										}>
										-
									</button>
									<span>{item.quantity}</span>
									<button
										className="border px-3 py-1"
										onClick={() =>
											handleIncrement(item)
										}>
										+
									</button>
								</div>
							</div>

							{/* Item Total */}
							<div className="font-semibold text-lg">
								₹{item.price * item.quantity}
							</div>
						</div>
					))}
				</div>

				{/* Right Side - Price Summary */}
				<div className="bg-white p-6 rounded shadow h-fit">
					<h3 className="text-lg font-semibold border-b pb-4">
						PRICE DETAILS
					</h3>

					<div className="flex justify-between mt-4">
						<span>Total Items</span>
						<span>{cartData?.length}</span>
					</div>

					<div className="flex justify-between mt-2">
						<span>Total Price</span>

						<span>₹{totalPrice}</span>
					</div>

					<div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
						<span>Amount Payable</span>
						<span>₹{totalPrice}</span>
					</div>
					{/* <Link
						to={"/cart"}
						className="bg-yellow-400 px-6 py-3 rounded font-medium"
						// onClick={handleCartItem}
					>
						Place Order
					</Link> */}
					<Link
						to={"/payment"}
						className="w-full bg-orange-500 text-white py-3 mt-6 rounded font-medium">
						Place Order
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Cart;
