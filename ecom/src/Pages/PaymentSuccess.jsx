import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const PaymentSuccess = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const paymentId = location.state?.paymentId || "N/A";

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
				{/* Success Icon */}
				<div className="flex justify-center mb-4">
					<div className="bg-green-100 p-4 rounded-full">
						<svg
							className="w-10 h-10 text-green-600"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				</div>

				{/* Title */}
				<h1 className="text-2xl font-bold text-gray-800 mb-2">
					Payment Successful 🎉
				</h1>

				<p className="text-gray-600 mb-4">
					Your order has been placed successfully.
				</p>

				{/* Payment Details */}
				<div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
					<p className="text-sm text-gray-500">Payment ID</p>
					<p className="font-semibold text-gray-800 break-all">
						{paymentId}
					</p>
				</div>

				{/* Buttons */}
				<div className="flex flex-col gap-3">
					<button
						onClick={() => navigate("/orders")}
						className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
						View Orders
					</button>

					<button
						onClick={() => navigate("/")}
						className="border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
						Continue Shopping
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccess;
