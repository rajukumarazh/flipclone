import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { tokenLogin } from "../features/auth/authSlice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Addresses = () => {
	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<Link
				to={"/checkout"}
				className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-300">
				Add Address
			</Link>
			<div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
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
											state={{ id: addr._id }}
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
			</div>
		</div>
	);
};

export default Addresses;
