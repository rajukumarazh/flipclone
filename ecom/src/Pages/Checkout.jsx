import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { tokenLogin } from "../features/auth/authSlice";
const Checkout = () => {
	const [adress, setAddress] = useState({
		name: "",
		address: "",
		zip: "",
		phone: "",
	});
	const dispatch = useDispatch();
	const [addresses, setAddresses] = useState([]);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const location = useLocation();
	var { id, from } = location?.state;
	console.log("kkkkkkkk", id);
	console.log("states", location?.state);
	const navigate = useNavigate();
	let userdata = useSelector((state) => state?.auth);
	console.log("used", userdata);
	//console.log("from", from);
	async function saveAddress() {
		let dt = await axios.post("http://localhost:5000/api/address", {
			...adress,
			// user_id: userdata?._id,
			user: userdata?.user?._id,
		});

		let add2 = await axios.post(
			"http://localhost:5000/api/user_addresses",
			{
				// user: id,
				user: "69a1b2e11a878ced01e3f469",
			},
		);
		dispatch(
			tokenLogin({
				address: add2?.data,
				data: add2?.data[0]?.user,
			}),
		);

		if (location?.state?.from === "/profile") {
			navigate("/profile");
		} else {
			navigate("/payment", { state: { id: userdata?.user?.id } });
		}
	}
	async function updateAddress() {
		let dta = await axios.put(`http://localhost:5000/api/address/${id}`, {
			adress,
		});
		let add2 = await axios.post(
			"http://localhost:5000/api/user_addresses",
			{
				// user: id,
				user: "69a1b2e11a878ced01e3f469",
			},
		);
		dispatch(
			tokenLogin({
				address: add2?.data,
				data: add2?.data[0]?.user,
			}),
		);
		console.log("allAddress", add2);
		console.log("updatedAddress", dta);

		if (dta) {
			navigate("/payment");
		}
	}
	useEffect(() => {
		let filterAddress = userdata?.user_addresses?.filter((item) => {
			return item._id === location?.state?.id;
		});
		if (filterAddress.length > 0) {
			const addr = filterAddress[0];

			setSelectedAddress(addr);

			setAddress({
				name: addr.name,
				phone: addr.phone,
				address: addr.address,
				zip: addr.zip,
			});
		}
	}, [userdata, id]);
	console.log("kkkkkk", selectedAddress, adress);
	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			<h2 className="text-2xl font-semibold mb-6">Address</h2>

			<div className="bg-white p-6 rounded shadow space-y-4">
				<input
					className="w-full border p-3 rounded"
					placeholder="Full Name"
					value={adress.name}
					onChange={(e) =>
						setAddress({ ...adress, name: e.target.value })
					}
				/>
				<div className="flex gap-60">
					<input
						className=" w-1/8 border p-3 rounded"
						placeholder="Address"
						value={adress.address}
						onChange={(e) =>
							setAddress({
								...adress,
								address: e.target.value,
							})
						}
					/>
					<input
						className="w-7/8 border p-3 rounded"
						placeholder="Zip"
						value={adress.zip}
						onChange={(e) =>
							setAddress({
								...adress,
								zip: e.target.value,
							})
						}
					/>
				</div>
				<input
					className="w-full border p-3 rounded"
					placeholder="Phone"
					value={adress.phone}
					onChange={(e) =>
						setAddress({ ...adress, phone: e.target.value })
					}
				/>

				{id && from ? (
					<button
						onClick={() => saveAddress()}
						className="bg-green-600 text-white w-full py-3 rounded">
						Save Address
					</button>
				) : (
					<button
						onClick={() => updateAddress()}
						className="bg-green-600 text-white w-full py-3 rounded">
						Update Address
					</button>
				)}
			</div>
		</div>
	);
};

export default Checkout;
