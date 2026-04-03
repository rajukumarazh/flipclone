import { useEffect, useState } from "react";
import axios from "axios";
import AdminChart from "./AdminChart";
const Card = ({ title, value }) => (
	<div className="bg-white p-4 rounded shadow flex flex-col gap-2">
		<p className="text-gray-500">{title}</p>
		<h2 className="text-2xl font-bold">{value}</h2>
	</div>
);

const AdminDashboard = () => {
	const [stats, setStats] = useState({});
	const [chartData, setChartData] = useState([]);
	useEffect(() => {
		fetchStats();
		fetchStats();
		fetchChart();
	}, []);

	async function fetchStats() {
		const res = await axios.get("http://localhost:5000/api/admin/stats");
		setStats(res.data);
	}

	async function fetchChart() {
		const res = await axios.get(
			"http://localhost:5000/api/admin/revenue-chart",
		);
		console.log("reschart", res.data);
		setChartData(res.data);
	}
	return (
		<div>
			<div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card
					title="Users"
					value={stats.users || 0}
				/>
				<Card
					title="Orders"
					value={stats.orders || 0}
				/>
				<Card
					title="Revenue"
					value={`₹${stats.revenue || 0}`}
				/>
				<Card
					title="Products"
					value={stats.products || 0}
				/>
			</div>
			<AdminChart data={{ chartData }} />
		</div>
	);
};

export default AdminDashboard;
