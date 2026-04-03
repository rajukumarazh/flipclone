import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const AdminChart = ({ data }) => {
	console.log("datachart", data);
	return (
		<div className="bg-white p-4 rounded shadow">
			<h2 className="mb-4 font-semibold">Revenue Overview</h2>

			<ResponsiveContainer
				width="100%"
				height={300}>
				<LineChart data={data?.chartData}>
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="revenue"
						stroke="#8884d8"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default AdminChart;
