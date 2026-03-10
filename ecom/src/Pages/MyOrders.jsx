import React from "react";
import OrderCard from "../components/OrderCard";

const orders = [
	{
		id: "OD123456789",
		date: "20 Feb 2026",
		status: "Delivered",
		totalAmount: 24999,
		items: [
			{
				name: "iPhone 14",
				image: "/images/iphone.jpg",
				price: 24999,
			},
		],
	},
	{
		id: "OD987654321",
		date: "18 Feb 2026",
		status: "Pending",
		totalAmount: 1499,
		items: [
			{
				name: "Nike Running Shoes",
				image: "/images/shoes.jpg",
				price: 1499,
			},
		],
	},
];

const MyOrders = () => {
	return (
		<div className="bg-gray-100 min-h-screen py-6">
			<div className="max-w-6xl mx-auto px-4">
				<h1 className="text-2xl font-semibold mb-6">My Orders</h1>

				<div className="space-y-4">
					{orders.map((order) => (
						<OrderCard
							key={order.id}
							order={order}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyOrders;
