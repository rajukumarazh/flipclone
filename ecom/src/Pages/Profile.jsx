import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import { useSelector } from "react-redux";
const Profile = () => {
	const userData = useSelector((state) => state?.auth?.user);
	const [addresses, setAddresses] = useState([]);
	const [allAddress, setAlladdress] = useState([]);
	const add = useSelector((state) => state?.auth?.user_addresses);
	console.log("adddd", add);
	useEffect(() => {
		if (userData?._id) {
			setAlladdress(add);
			getUserAddress();
		}
	}, [userData]);

	const getUserAddress = async () => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/user_addresses",
				{
					user: userData?._id,
				},
			);
			setAddresses(res.data);
		} catch (error) {
			console.error(error);
		}
	};
	async function deleteAddress(id) {
		console.log("idddd", id);
		let deletedAddress = await axios.delete(
			`http://localhost:5000/api/address/${id}`,
		);

		let all2 = addresses?.filter(
			(curr) => curr._id !== deletedAddress?.data?._id,
		);
		setAlladdress(all2);
		console.log("deletedAddress", all2);
	}
	console.log("address", addresses);
	async function makeDefaultAddress(id) {
		let defaultAddress = await axios.put(
			`http://localhost:5000/api/update_address_category/${id}`,
			{
				id: id,
				user_id: userData?._id,
				type: "default",
				category: "home",
			},
		);
		setAlladdress((prev) =>
			prev.map((addr) => ({
				...addr,
				isDefault: String(addr._id) === String(id),
			})),
		);

		//setAddresses(updated);
		console.log("updatedcategory", defaultAddress);
	}
	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			<div className="bg-white p-6 rounded-xl shadow-md">
				{/* Profile Header */}
				<h2 className="text-2xl font-semibold mb-6 border-b pb-3">
					My Profile
				</h2>

				{/* User Info */}
				<div className="grid sm:grid-cols-2 gap-4 text-gray-700">
					<p>
						<span className="font-medium">Name:</span>{" "}
						{userData?.name}
					</p>
					<p>
						<span className="font-medium">Email:</span>{" "}
						{userData?.email}
					</p>
					<p>
						<span className="font-medium">Member Since:</span>{" "}
						{new Date(
							userData?.createdAt,
						).toLocaleDateString()}
					</p>
				</div>

				{/* Address Section */}
				<div className="mt-8">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-xl font-semibold">
							My Addresses
						</h3>

						<Link
							to="/checkout"
							state={{
								id: userData?._id,
								from: "/profile",
							}}
							className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm">
							+ Add New
						</Link>
					</div>

					{addresses.length > 0 ? (
						<div className="grid sm:grid-cols-2 gap-4">
							{allAddress.map((addr, index) => (
								<div
									key={addr._id}
									className="border rounded-lg p-4 hover:shadow-md transition relative">
									{/* Default Tag (optional) */}

									<span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
										{addr?.isDefault === true
											? " Default"
											: ""}
									</span>
									<span className="absolute top-2 left-2 text-xs bg-green-100 text-red-700 px-2 py-0.5 rounded">
										{addr?.category}
									</span>

									<h4 className="font-semibold text-gray-800 py-3">
										{addr.name}
									</h4>

									<p className="text-sm text-gray-600 mt-1">
										{addr.address}
									</p>

									<p className="text-sm text-gray-600">
										{addr.city}
									</p>

									<p className="text-sm text-gray-600">
										📞 {addr.phone}
									</p>

									{/* Actions */}
									<div className="flex gap-4 mt-3 text-sm">
										<Link
											to="/checkout"
											state={{
												from: "/profile",
												id: addr._id,
											}}
											className="text-blue-600 hover:underline">
											Edit
										</Link>
										<button
											onClick={() =>
												deleteAddress(
													addr?._id,
												)
											}
											className="text-red-500 hover:underline">
											Delete
										</button>
										{addr?.isDefault === !true ? (
											<button
												onClick={() =>
													makeDefaultAddress(
														addr?._id,
													)
												}
												className="text-red-500 hover:underline">
												Make default
											</button>
										) : (
											""
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-10 text-gray-500">
							<p>No address found</p>
							<button className="mt-3 text-blue-600 hover:underline">
								Add Address
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
