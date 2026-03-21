import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const { data } = await axios.get(
					"http://localhost:5000/api/orders",
				);
				setOrders(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchOrders();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<h1 className="text-2xl font-semibold mb-6">My Orders</h1>

			{orders.length === 0 ? (
				<div className="text-center text-gray-500">
					No orders found 😢
				</div>
			) : (
				<div className="space-y-4">
					{orders.map((order) => (
						<div
							key={order._id}
							className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
							{/* Left Section */}
							<div className="flex gap-4 items-center">
								{/* Product Image */}
								<img
									src={
										order.image ||
										"https://via.placeholder.com/80"
									}
									alt="product"
									className="w-20 h-20 object-cover rounded"
								/>

								{/* Details */}
								<div>
									<h2 className="font-semibold text-lg">
										{order.productName}
									</h2>

									<p className="text-gray-600 text-sm">
										₹{order.amount}
									</p>

									<p className="text-gray-500 text-xs">
										Payment ID: {order.paymentId}
									</p>
								</div>
							</div>

							{/* Right Section */}
							<div className="text-right">
								<p className="text-green-600 font-medium">
									{order.status}
								</p>

								<p className="text-sm text-gray-500">
									{new Date(
										order.createdAt,
									).toDateString()}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Orders;
