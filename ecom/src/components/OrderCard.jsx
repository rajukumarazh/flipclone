import React from "react";

const OrderCard = ({ order }) => {
	const getStatusColor = (status) => {
		if (status === "Delivered") return "text-green-600";
		if (status === "Cancelled") return "text-red-600";
		return "text-yellow-500";
	};

	return (
		<div className="bg-white rounded shadow-sm border p-4 hover:shadow-md transition">
			{/* Top Section */}
			<div className="flex justify-between items-center border-b pb-3 mb-3">
				<div>
					<p className="text-sm text-gray-500">
						Order ID: {order.id}
					</p>
					<p className="text-sm text-gray-500">
						Order Date: {order.date}
					</p>
				</div>

				<div className="text-right">
					<p
						className={`font-semibold ${getStatusColor(
							order.status,
						)}`}>
						● {order.status}
					</p>
					<p className="text-sm text-gray-600">
						₹ {order.totalAmount}
					</p>
				</div>
			</div>

			{/* Products */}
			{order.items.map((item, index) => (
				<div
					key={index}
					className="flex items-center gap-4">
					<img
						src={item.image}
						alt={item.name}
						className="w-20 h-20 object-cover border rounded"
					/>

					<div className="flex-1">
						<h2 className="font-medium">{item.name}</h2>
						<p className="text-gray-600 text-sm">
							₹ {item.price}
						</p>
					</div>

					<button className="text-blue-600 hover:underline text-sm">
						View Details
					</button>
				</div>
			))}
		</div>
	);
};

export default OrderCard;
