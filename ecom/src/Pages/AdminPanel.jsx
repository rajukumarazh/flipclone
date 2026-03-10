const AdminPanel = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

			<div className="grid md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white p-6 rounded shadow">
					Total Users
				</div>
				<div className="bg-white p-6 rounded shadow">
					Total Orders
				</div>
				<div className="bg-white p-6 rounded shadow">Revenue</div>
			</div>

			<div className="bg-white p-6 rounded shadow">
				<h3 className="font-semibold mb-4">Products</h3>
				<table className="w-full text-left">
					<thead>
						<tr className="border-b">
							<th className="py-2">Name</th>
							<th>Price</th>
							<th>Stock</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b">
							<td className="py-2">Sample Product</td>
							<td>₹999</td>
							<td>120</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminPanel;
