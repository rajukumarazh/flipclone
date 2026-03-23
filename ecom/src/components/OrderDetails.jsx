import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const OrderDetails = () => {
	const allState = useSelector((state) => state);
	const allOrder = useSelector((state) => state?.order?.myOrder);
	console.log("allOrder", allOrder, allState);
	const location = useLocation();
	let data = location?.state;
	console.log("datsa", data);
	const { id } = useParams();
	console.log("iddd", id);
	const [order, setOrder] = useState(null);
	let selectedOrder = allOrder?.filter((curr) => curr._id == id);
	console.log("allOrder", selectedOrder);
	// useEffect(() => {
	// 	getOrder();
	// }, []);
	// console.log("order", order);
	// async function getOrder() {
	// 	try {
	// 		const res = await axios.get(
	// 			`http://localhost:5000/api/orders/${id}`,
	// 		);
	// 		setOrder(res.data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }

	if (!selectedOrder) return <p className="text-center mt-10">Loading...</p>;

	return (
		<div className="max-w-5xl mx-auto p-4 space-y-6">
			{/* 🧾 Order Info */}
			<div className="bg-white p-4 rounded shadow">
				<h2 className="text-lg font-semibold mb-2">Order Info</h2>
				<p>
					<strong>Order ID:</strong> {selectedOrder[0]._id}
				</p>
				<p>
					<strong>Status:</strong> {selectedOrder[0].status}
				</p>
				<p>
					<strong>Total:</strong> ₹{selectedOrder[0].totalAmount}
				</p>
				<p>
					<strong>Date:</strong>{" "}
					{new Date(selectedOrder[0].createdAt).toDateString()}
				</p>
			</div>

			{/* 📍 Address */}
			<div className="bg-white p-4 rounded shadow">
				<h2 className="text-lg font-semibold mb-2">
					Delivery Address
				</h2>

				{selectedOrder ? (
					<>
						<p>{selectedOrder[0].address_id.name}</p>
						<p>{selectedOrder[0]?.address_id.phone}</p>
						<p>{selectedOrder[0].address_id.address}</p>
						{/* <p>
							{order.address_id.city},{" "}
							{order.address_id.state}
						</p> */}
						{/* <p>{order.address_id.pincode}</p> */}
						<p>Phone: {selectedOrder[0].address_id.phone}</p>
					</>
				) : (
					<p>No address found</p>
				)}
			</div>

			{/* 🚚 Tracking Timeline */}
			<div className="bg-white p-4 rounded shadow">
				<h2 className="text-lg font-semibold mb-4">Tracking</h2>

				<div className="flex flex-col gap-2 text-sm">
					<p className="text-green-600">✔ Order Placed</p>
					<p className="text-green-600">✔ Payment Confirmed</p>
					{/* <p
						className={
							order.status === "shipped" ||
							order.status === "delivered"
								? "text-green-600"
								: "text-gray-400"
						}>
						✔ Shipped
					</p> */}
					{/* <p
						className={
							order.status === "delivered"
								? "text-green-600"
								: "text-gray-400"
						}>
						✔ Delivered
					</p> */}
				</div>
			</div>

			{/* 🛒 Products */}
			<div className="bg-white p-4 rounded shadow">
				<h2 className="text-lg font-semibold mb-4">Products</h2>

				{data?.map((item, index) => (
					<div
						key={index}
						className="flex gap-4 mb-4 border-b pb-3">
						{/* Image */}
						<img
							src={item?.image}
							alt={item?.title}
							className="w-24 h-24 border rounded"
						/>

						{/* Info */}
						<div className="flex-1">
							<p className="font-medium">{item?.title}</p>
							<p className="text-sm text-gray-600">
								Quantity: {item.quantity}
							</p>
							<p className="text-sm text-gray-600">
								Price: ₹{item.price}
							</p>
						</div>

						{/* Action */}
						<button className="text-blue-600 hover:underline text-sm">
							Buy Again
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderDetails;
