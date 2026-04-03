import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";
const AdminOrders = () => {
	const [orders, setOrders] = useState([]);
	const [orders2, setOrders2] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [status, setStatus] = useState("");
	const [search, setSearch] = useState("");
	useEffect(() => {
		const delay = setTimeout(() => {
			fetchOrders();
		}, 500);
		return () => clearTimeout(delay);
	}, [search, status, page]);
	useEffect(() => {
		fetchOrders();
	}, [page, status]);
	useEffect(() => {
		setPage(1);
	}, [page]);

	async function fetchOrders() {
		const res = await axios.get(
			`http://localhost:5000/api/admin/orders?page=${page}&status=${status}&search=${search}`,
		);
		setOrders(res.data?.orders);
		// console.log("ordersOfAdmin", res);
	}

	async function updateStatus(id, status) {
		await axios.put(`http://localhost:5000/api/admin/orders/${id}`, {
			status,
		});

		setOrders((prev) =>
			prev.map((o) => (o._id === id ? { ...o, status } : o)),
		);
	}

	return (
		<div className="p-4">
			<h2 className="text-xl font-semibold mb-4">All Orders</h2>
			<div className="flex gap-2 mb-4">
				<input
					placeholder="Search user..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="border p-2 rounded"
				/>

				<select
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					className="border p-2 rounded">
					<option value="">All</option>
					<option value="pending">Pending</option>
					<option value="delivered">Delivered</option>
					<option value="cancelled">Cancel</option>
					<option value="shipped">Shiped</option>
				</select>
			</div>
			{/* 🔥 TABLE */}
			<div className="h-[500px] overflow-auto border rounded">
				<table className="w-full min-w-[900px]">
					<thead className="bg-gray-200 sticky top-0">
						<tr>
							<th className="p-2 border">Order ID</th>
							<th className="p-2 border">User</th>
							<th className="p-2 border">Amount</th>
							<th className="p-2 border">Status</th>
							<th className="p-2 border">Date</th>
							<th className="p-2 border">Actions</th>
						</tr>
					</thead>

					<tbody>
						{orders?.map((order) => (
							<tr
								key={order._id}
								className="hover:bg-gray-100 even:bg-gray-50">
								<td className="p-2 border">
									{order._id}
								</td>
								<td className="p-2 border">
									{order?.user_id?.email}
								</td>
								<td className="p-2 border">
									₹{order.totalAmount}
								</td>

								{/* 🔥 STATUS */}
								<td className="p-2 border">
									<select
										value={order.status}
										onChange={(e) =>
											updateStatus(
												order._id,
												e.target.value,
											)
										}
										className="border px-2 py-1 rounded">
										<option value="pending">
											Pending
										</option>
										<option value="shipped">
											Shipped
										</option>
										<option value="delivered">
											Delivered
										</option>
										<option value="cancelled">
											Cancelled
										</option>
									</select>
								</td>
								<td className="p-2 border">
									{new Date(
										order.createdAt,
									).toLocaleDateString()}
								</td>
								<td className="p-2 border">
									<button
										onClick={() =>
											setSelectedOrder(order)
										}
										className="bg-blue-500 text-white px-3 py-1 rounded">
										View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination
					page={page}
					totalPages={totalPages}
					setPage={setPage}
				/>
			</div>
			{selectedOrder && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
					{/* MODAL BOX */}
					<div className="bg-white w-[600px] max-h-[80vh] overflow-y-auto rounded-lg p-5 relative">
						{/* ❌ CLOSE BUTTON */}
						<button
							onClick={() => setSelectedOrder(null)}
							className="absolute top-2 right-3 text-xl">
							✖
						</button>

						<h2 className="text-xl font-semibold mb-4">
							Order Details
						</h2>

						{/* 🔥 BASIC INFO */}
						<p>
							<strong>Order ID:</strong>{" "}
							{selectedOrder._id}
						</p>
						<p>
							<strong>User:</strong>{" "}
							{selectedOrder?.user_id?.name}
						</p>
						<p>
							<strong>Total:</strong> ₹
							{selectedOrder.totalAmount}
						</p>
						<p>
							<strong>Status:</strong>{" "}
							{selectedOrder?.status}
						</p>

						{/* 📦 ITEMS */}
						<h3 className="mt-4 font-semibold">Items</h3>

						{selectedOrder?.products?.map((item, i) => (
							<div
								key={i}
								className="border p-2 mt-2 rounded">
								<p>{item.title}</p>
								<p>Qty: {item.quantity}</p>
								<p>Price: ₹{item.price}</p>
							</div>
						))}

						{/* 📍 ADDRESS */}
						<h3 className="mt-4 font-semibold">
							Shipping Address
						</h3>

						<p>{selectedOrder?.address_id?.name}</p>
						<p>{selectedOrder.address_id?.address}</p>
						{/* <p>{selectedOrder.address?.city}</p> */}
						<p>{selectedOrder.address_id?.phone}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminOrders;
