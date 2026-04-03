import { useEffect, useState } from "react";
import axios from "axios";
//import UserModal from "../Modals/UserModal";

const AdminUsers = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		const res = await axios.get("http://localhost:5000/api/admin/users");
		setUsers(res.data);
	}

	// 🔥 DELETE USER
	async function deleteUser(id) {
		await axios.delete(`http://localhost:5000/api/admin/users/${id}`);

		setUsers((prev) => prev.filter((u) => u._id !== id));
	}

	// 🔥 UPDATE ROLE
	async function updateRole(id, role) {
		await axios.put(`http://localhost:5000/api/admin/users/${id}`, {
			role,
		});

		setUsers((prev) =>
			prev.map((u) => (u._id === id ? { ...u, role } : u)),
		);
	}

	// 🔥 FILTER USERS
	const filteredUsers = users.filter((u) =>
		u.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="p-4">
			<h2 className="text-xl font-semibold mb-4">All Users</h2>

			{/* 🔍 SEARCH */}
			<input
				type="text"
				placeholder="Search user..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="border p-2 mb-4 w-full rounded"
			/>

			{/* 🔥 TABLE */}
			<div className="h-[500px] overflow-auto border rounded">
				<table className="w-full min-w-[800px]">
					<thead className="bg-gray-200 sticky top-0">
						<tr>
							<th className="p-2 border">Name</th>
							<th className="p-2 border">Email</th>
							<th className="p-2 border">Role</th>
							<th className="p-2 border">Joined</th>
							<th className="p-2 border">Actions</th>
						</tr>
					</thead>

					<tbody>
						{filteredUsers.map((user) => (
							<tr
								key={user._id}
								className="hover:bg-gray-100 even:bg-gray-50">
								<td className="p-2 border">
									{user.name}
								</td>
								<td className="p-2 border">
									{user.email}
								</td>

								{/* 🔥 ROLE */}
								<td className="p-2 border">
									<select
										value={user.role}
										onChange={(e) =>
											updateRole(
												user._id,
												e.target.value,
											)
										}
										className="border px-2 py-1 rounded">
										<option value="user">
											User
										</option>
										<option value="admin">
											Admin
										</option>
									</select>
								</td>

								<td className="p-2 border">
									{new Date(
										user.createdAt,
									).toLocaleDateString()}
								</td>

								<td className="p-2 border">
									<button
										onClick={() =>
											deleteUser(user._id)
										}
										className="bg-red-500 text-white px-3 py-1 rounded">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* EMPTY STATE */}
			{filteredUsers.length === 0 && (
				<p className="text-center mt-4 text-gray-500">
					No users found
				</p>
			)}
		</div>
	);
};

export default AdminUsers;
