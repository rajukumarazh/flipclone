import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { tokenLogin } from "../features/auth/authSlice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Payment = () => {
	const [step, setStep] = useState(1);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [paymentMethod, setPaymentMethod] = useState("");
	const [allAddress2, setAlladdress2] = useState();
	const [addressList, setAddressList] = useState();
	let dispatch = useDispatch();
	const location = useLocation();
	const id = location?.state?.id;
	const navigate = useNavigate();
	const cartData = useSelector((state) => state?.products?.cart);
	const cartData2 = useSelector((state) => state?.products);
	const allAddress = useSelector((state) => state?.auth?.user_addresses);
	const currentUser = useSelector((state) => state?.auth);
	const totalAmount = useSelector((state) => state?.products?.totalAmount);
	console.log("totalAmount", totalAmount);
	useEffect(() => {
		getAlladress();
		setAlladdress2(allAddress);
	}, [allAddress]);

	console.log("cartData", cartData);
	console.log("user", currentUser);

	const paymentOptions = [
		"UPI",
		"Credit / Debit Card",
		"Net Banking",
		"Cash on Delivery",
	];
	console.log("selectedAddress", selectedAddress);
	const nextStep = () => setStep(step + 1);
	const prevStep = () => setStep(step - 1);
	async function getAlladress() {
		let add2 = await axios.post(
			"http://localhost:5000/api/user_addresses",
			{
				// user: id,
				user: currentUser?.user?._id,
			},
		);
		console.log("aad", add2);
		//setAddressList(add2?.data?.map(({ user, ...rest }) => rest));
	}
	//console.log("addresssList", allAddress2);
	async function deleteAddress(id) {
		console.log("idddd", id);
		let deletedAddress = await axios.delete(
			`http://localhost:5000/api/address/${id}`,
		);
		//console.log("deletedAddress", deletedAddress);
		let all = await getAlladress();
		//console.log("all", all);
		let all2 = allAddress2?.filter(
			(curr) => curr._id !== deletedAddress?.data?._id,
		);
		setAlladdress2(all2);
		console.log("deletedAddress", all2);
	}

	const handlePayment = async () => {
		try {
			// 1. Create order
			const { data } = await axios.post(
				"http://localhost:5000/api/payment/create-order",
				{ amount: totalAmount },
			);
			console.log("paymentData", data);
			const order = data.order;

			// 2. Open Razorpay
			const options = {
				key: "rzp_test_SSuHvi6tcJdFE5",
				amount: order.amount,
				currency: "INR",
				name: "My Shop",
				description: "Test Payment",
				order_id: order.id,
				handler: async function (response) {
					// 3. Verify payment
					//console.log("FRONTEND RESPONSE:", response);

					const verify = await axios.post(
						"http://localhost:5000/api/payment/verify-payment",
						{
							razorpay_order_id:
								response.razorpay_order_id,
							razorpay_payment_id:
								response.razorpay_payment_id,
							razorpay_signature:
								response.razorpay_signature,
							products: cartData,
							totalAmount: cartData2?.totalAmount,
							address_id: selectedAddress._id,
							user_id: currentUser?.user?._id,
						},
					);
					//let saveOrder = async axios.post("http://localhost:5000/api/order");
					//console.log("verificationData", verify);
					if (verify?.data?.success === true) {
						// async function saveOrder() {
						// 	let savedOrder = await axios.post(
						// 		"http://localhost:5000/api/create_order",
						// 		{
						// 			paymentId:
						// 				response.razorpay_payment_id,
						// 			user_id: id,
						// 			address_id: selectedAddress?._id,
						// 			product_id: cartData?.map(
						// 				(curr) => curr?.id,
						// 			),
						// 		},
						// 	);
						// 	console.log("savedOrder", savedOrder);
						// }
						// saveOrder();
						navigate("/success", {
							state: {
								paymentId: response.razorpay_payment_id,
								user_id: id,
								// address_id: selectedAddress?._id,
								// product_id: cartData?.map(
								// 	(curr) => curr?.id,
								// ),
							},
						});
					}
				},

				prefill: {
					name: currentUser?.user?.name,
					email: currentUser?.user?.email,
					contact: "999999999",
				},

				theme: {
					color: "#2874f0", // Flipkart blue 😄
				},
			};
			//console.log("verfyData", verify);
			const rzp = new window.Razorpay(options);
			rzp.open();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<Link
				to="/checkout"
				state={{
					id: currentUser?.user?._id,
					from: "/payment",
				}}
				className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-300">
				Add Address
			</Link>
			<div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
				{/* Step Indicator */}
				<div className="flex justify-between mb-8">
					{["Address", "Payment", "Review"].map(
						(label, index) => (
							<div
								key={index}
								className={`flex-1 text-center font-medium ${
									step === index + 1
										? "text-orange-500"
										: "text-gray-400"
								}`}>
								{label}
							</div>
						),
					)}
				</div>

				{/* STEP 1 - Address */}
				{step === 1 && (
					<div>
						<h2 className="text-xl font-semibold mb-4">
							Select Address
						</h2>
						<div className="space-y-4">
							{allAddress2?.map((addr) => (
								<div
									key={addr._id}
									className={`border p-4 rounded-lg flex justify-between items-start cursor-pointer ${
										selectedAddress?._id ===
										addr._id
											? "border-orange-500 bg-orange-50"
											: "border-gray-300"
									}`}>
									<div className="flex gap-3">
										{/* Radio Button */}
										<input
											type="radio"
											name="address"
											checked={
												selectedAddress ===
												addr
											}
											onChange={() =>
												setSelectedAddress(
													addr,
												)
											}
										/>

										{/* Address Info */}
										<div>
											<p className="font-semibold">
												{addr.name}
												<br />
												{addr.phone}
											</p>
											<p className="text-gray-600">
												{addr.address}
											</p>
										</div>
									</div>

									{/* Actions */}
									<div className="flex gap-3">
										<Link
											to="/checkout"
											state={{
												id: addr?._id,
												from: "/payment",
											}}
											className="text-blue-500 text-sm">
											Edit
										</Link>

										<button
											onClick={() =>
												deleteAddress(
													addr._id,
												)
											}
											className="text-red-500 text-sm">
											Delete
										</button>
									</div>
								</div>
							))}
						</div>

						<button
							disabled={!selectedAddress}
							onClick={nextStep}
							className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-300">
							Continue
						</button>
					</div>
				)}

				{/* STEP 2 - Payment */}
				{step === 2 && (
					<div>
						<h2 className="text-xl font-semibold mb-4">
							Select Payment Method
						</h2>
						<div className="space-y-4">
							{paymentOptions.map((method, index) => (
								<div
									key={index}
									onClick={() =>
										setPaymentMethod(method)
									}
									className={`border p-4 rounded-lg cursor-pointer ${
										paymentMethod === method
											? "border-orange-500 bg-orange-50"
											: "border-gray-300"
									}`}>
									{method}
								</div>
							))}
						</div>

						<div className="flex justify-between mt-6">
							<button
								onClick={prevStep}
								className="bg-gray-300 px-6 py-2 rounded-lg">
								Back
							</button>

							<button
								disabled={!paymentMethod}
								onClick={nextStep}
								className="bg-orange-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-300">
								Continue
							</button>
						</div>
					</div>
				)}

				{/* STEP 3 - Review */}
				{step === 3 && (
					<div>
						<h2 className="text-xl font-semibold mb-4">
							Review Order
						</h2>

						<div className="mb-4">
							<p>
								<strong className="text-red-500">
									Address:
								</strong>{" "}
								{selectedAddress?.address}
							</p>
							<p>
								<strong className="text-red-500">
									Payment:
								</strong>{" "}
								{paymentMethod}
							</p>
						</div>

						<div className="border-t pt-4">
							{/* <p>Product: iPhone 15</p>
							<p>Total: ₹68,000</p> */}

							{cartData?.map((item) => {
								return (
									<div>
										<p className="text-green-500">
											Title: {item?.title}
										</p>
										<p className="text-green-500">
											Quantity: {item.quantity}
										</p>
									</div>
								);
							})}

							<p className="text-red-500">
								Total Amount: Rs-
								{cartData2?.totalAmount}
							</p>
						</div>

						<div className="flex justify-between mt-6">
							<button
								onClick={prevStep}
								className="bg-gray-300 px-6 py-2 rounded-lg">
								Back
							</button>

							<button
								onClick={() => handlePayment()}
								className="bg-green-500 text-white px-6 py-2 rounded-lg">
								Confirm Order
							</button>
						</div>
					</div>
				)}

				{/* STEP 4 - Success */}
				{step === 4 && (
					<div className="text-center py-10">
						<h2 className="text-2xl font-semibold text-green-600 mb-4">
							🎉 Order Placed Successfully!
						</h2>
						<p className="text-gray-600">
							Your order will be delivered soon.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Payment;
