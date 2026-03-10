import React from "react";

export default function FilterSideBar() {
	return (
		<div className="w-64 bg-white p-4 rounded shadow h-fit">
			<h2 className="text-lg font-semibold mb-4 border-b pb-2">
				Filters
			</h2>

			{/* Category Filter */}
			<div className="mb-4">
				<details
					open
					className="group">
					<summary className="cursor-pointer font-medium text-gray-800 mb-2">
						Category
					</summary>
					<div className="space-y-2 text-sm text-gray-600 mt-2">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								className="accent-blue-600"
							/>
							Mobiles
						</label>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								className="accent-blue-600"
							/>
							Laptops
						</label>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								className="accent-blue-600"
							/>
							Fashion
						</label>
					</div>
				</details>
			</div>

			{/* Price Filter */}
			<div className="mb-4">
				<details className="group">
					<summary className="cursor-pointer font-medium text-gray-800 mb-2">
						Price
					</summary>
					<div className="space-y-2 text-sm text-gray-600 mt-2">
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="price"
								className="accent-blue-600"
							/>
							Under ₹10,000
						</label>
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="price"
								className="accent-blue-600"
							/>
							₹10,000 - ₹50,000
						</label>
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="price"
								className="accent-blue-600"
							/>
							Above ₹50,000
						</label>
					</div>
				</details>
			</div>

			{/* Brand Filter */}
			<div className="mb-4">
				<details className="group">
					<summary className="cursor-pointer font-medium text-gray-800 mb-2">
						Brand
					</summary>
					<div className="space-y-2 text-sm text-gray-600 mt-2">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								className="accent-blue-600"
							/>
							Apple
						</label>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								className="accent-blue-600"
							/>
							Samsung
						</label>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								className="accent-blue-600"
							/>
							Sony
						</label>
					</div>
				</details>
			</div>

			{/* Rating Filter */}
			<div>
				<details className="group">
					<summary className="cursor-pointer font-medium text-gray-800 mb-2">
						Customer Rating
					</summary>
					<div className="space-y-2 text-sm text-gray-600 mt-2">
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="rating"
								className="accent-blue-600"
							/>
							4★ & above
						</label>
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="rating"
								className="accent-blue-600"
							/>
							3★ & above
						</label>
					</div>
				</details>
			</div>
		</div>
	);
}
