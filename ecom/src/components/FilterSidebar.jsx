import React from "react";

export default function FilterSideBar({ filters, setFilters }) {
	const categories = ["Mobiles", "Laptops", "Fashion"];

	const price = ["Under ₹100", "₹100 - ₹500", "Above ₹500"];
	console.log("filters", filters);
	// ✅ checkbox (multiple)
	const handleCheckbox = (cat) => {
		setFilters((prev) => {
			let updated = [...prev.categories];

			if (updated.includes(cat)) {
				updated = updated.filter((c) => c !== cat);
			} else {
				updated.push(cat);
			}

			return {
				...prev,
				categories: updated,
			};
		});
	};

	// ✅ radio (single)
	const handleRadio = (key, value) => {
		setFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	return (
		<div className="w-64 bg-white p-4 rounded shadow h-fit">
			<h2 className="text-lg font-semibold mb-4 border-b pb-2">
				Filters
			</h2>

			{/* Category */}
			<div className="mb-4">
				<details
					open
					className="group">
					<summary className="cursor-pointer font-medium mb-2">
						Category
					</summary>

					{categories.map((cat, i) => (
						<label
							key={i}
							className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={filters.categories.includes(
									cat,
								)}
								onChange={() => handleCheckbox(cat)}
							/>
							{cat}
						</label>
					))}
				</details>
			</div>

			{/* Price */}
			<div className="mb-4">
				<details className="group">
					<summary className="cursor-pointer font-medium mb-2">
						Price
					</summary>

					{price.map((prc, i) => (
						<label
							key={i}
							className="flex items-center gap-2">
							<input
								type="radio"
								name="price"
								checked={filters.price === prc}
								onChange={() =>
									handleRadio("price", prc)
								}
							/>
							{prc}
						</label>
					))}
				</details>
			</div>

			{/* Rating */}
			<div>
				<details className="group">
					<summary className="cursor-pointer font-medium mb-2">
						Customer Rating
					</summary>

					{["4", "3"].map((rate) => (
						<label
							key={rate}
							className="flex items-center gap-2">
							<input
								type="radio"
								name="rating"
								checked={filters.rating === rate}
								onChange={() =>
									handleRadio("rating", rate)
								}
							/>
							{rate}★ & above
						</label>
					))}
				</details>
			</div>
		</div>
	);
}
