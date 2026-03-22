import React, { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import axios from "axios";
import { useSelector } from "react-redux";

const MyOrders = () => {
	const currentUser = useSelector((state) => state?.auth);

	const [allOrder, setAllorder] = useState([]); // ✅ fix

	useEffect(() => {
		if (currentUser?.user?._id) {
			getAllMyOrder();
		}
	}, [currentUser]);

	async function getAllMyOrder() {
		try {
			const userid = currentUser?.user?._id;

			const res = await axios.get(
				`http://localhost:5000/api/myorder/${userid}`,
			);

			console.log("allOrders", res.data);

			setAllorder(res.data); // ✅ fix
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="bg-gray-100 min-h-screen py-6">
			<div className="max-w-6xl mx-auto px-4">
				<h1 className="text-2xl font-semibold mb-6">My Orders</h1>

				{allOrder.length > 0 ? (
					<div className="space-y-4">
						{allOrder.map((order) => (
							<OrderCard
								key={order._id} // ✅ fix
								order={order}
							/>
						))}
					</div>
				) : (
					<p>No orders found</p> // ✅ better message
				)}
			</div>
		</div>
	);
};

export default MyOrders;
