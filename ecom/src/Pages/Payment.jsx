import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Payment = () => {
	const [step, setStep] = useState(1);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [paymentMethod, setPaymentMethod] = useState("");
	console.log("kkkkkkkkkkykyky", selectedAddress, paymentMethod);
	const cartData = useSelector((state) => state?.products?.cart);
	const cartData2 = useSelector((state) => state?.products);
	const allAddress = useSelector((state) => state?.auth?.user_addresses);
	console.log("address", allAddress);
	//totalAmount;

	// const addresses = [
	// 	"Raju Kumar, Lucknow, Uttar Pradesh",
	// 	"Office Address, Gomti Nagar, Lucknow",
	// ];

	const paymentOptions = [
		"UPI",
		"Credit / Debit Card",
		"Net Banking",
		"Cash on Delivery",
	];
	console.log("selectedAddress", selectedAddress);
	const nextStep = () => setStep(step + 1);
	const prevStep = () => setStep(step - 1);

	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<Link
				to={"/checkout"}
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
							{allAddress?.map((addr) => (
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
											state={{ id: addr._id }}
											className="text-blue-500 text-sm">
											Edit
										</Link>

										<button className="text-red-500 text-sm">
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
								onClick={nextStep}
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
