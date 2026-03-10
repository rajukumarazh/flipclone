import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Checkout = () => {
	const [adress, setAddress] = useState({
		name: "",
		address: "",
		zip: "",
		phone: "",
	});
	const location = useLocation();
	let id = location.state.id;
	console.log("iiiiid", id);
	const navigate = useNavigate();
	let userdata = useSelector((state) => state?.auth);
	console.log("used", userdata);

	async function saveAddress() {
		let dt = await axios.post("http://localhost:5000/api/address", {
			...adress,
			// user_id: userdata?._id,
			user: userdata?.user?._id,
		});
		if (dt) {
			navigate("/payment");
		}
		console.log("adddress", dt);
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			<h2 className="text-2xl font-semibold mb-6">Address</h2>

			<div className="bg-white p-6 rounded shadow space-y-4">
				<input
					className="w-full border p-3 rounded"
					placeholder="Full Name"
					onChange={(e) =>
						setAddress({ ...adress, name: e.target.value })
					}
				/>
				<div className="flex gap-60">
					<input
						className=" w-1/8 border p-3 rounded"
						placeholder="Address"
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
					onChange={(e) =>
						setAddress({ ...adress, phone: e.target.value })
					}
				/>

				<button
					onClick={() => saveAddress()}
					className="bg-green-600 text-white w-full py-3 rounded">
					Save Address
				</button>
			</div>
		</div>
	);
};

export default Checkout;
