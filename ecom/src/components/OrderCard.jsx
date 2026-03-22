import React from "react";

const OrderCard = ({ order }) => {
	console.log("order", order);

	const getStatusColor = (status) => {
		if (status === "delivered") return "text-green-600";
		if (status === "cancelled") return "text-red-600";
		return "text-yellow-500";
	};

	return (
		<div className="bg-white rounded shadow-sm border p-4 hover:shadow-md transition">
			{/* Top Section */}
			<div className="flex justify-between items-center border-b pb-3 mb-3">
				<div>
					<p className="text-sm text-gray-500">
						Order ID: {order?._id}
					</p>
					<p className="text-sm text-gray-500">
						{new Date(order?.createdAt).toDateString()}
					</p>
				</div>

				<div className="text-right">
					<p
						className={`font-semibold ${getStatusColor(
							order?.status,
						)}`}>
						● {order?.status}
					</p>
					<p className="text-sm text-gray-600">
						₹ {order?.totalAmount}
					</p>
				</div>
			</div>

			{/* Products */}
			{order?.products?.map((item, index) => (
				<div
					key={index}
					className="flex items-center gap-4 mb-3">
					{/* Image */}
					<img
						src={item?.product_id?.image}
						alt={item?.product_id?.title}
						className="w-20 h-20 object-cover border rounded"
					/>

					{/* Info */}
					<div className="flex-1">
						<h2 className="font-medium">
							{item?.product_id?.title}
						</h2>

						<p className="text-gray-600 text-sm">
							Qty: {item?.quantity}
						</p>

						<p className="text-gray-600 text-sm">
							₹ {item?.price}
						</p>
					</div>

					{/* Action */}
					<button className="text-blue-600 hover:underline text-sm">
						View Details
					</button>
				</div>
			))}
		</div>
	);
};

export default OrderCard;
