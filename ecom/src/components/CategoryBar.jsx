import { useNavigate } from "react-router-dom";
import { useState } from "react";
const CategoryBar = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState("");
	const categories = [
		"Electronics",
		"Fashion",
		"Home",
		"Appliances",
		"Beauty",
		"Toys",
		"Grocery",
		"Mobiles",
		"Furniture",
		"Travel",
	];
	const handleSearch = (e) => {
		if (e.key === "Enter") {
			navigate(`/products?q=${input}`);
		}
	};
	const handleCategory = (cat) => {
		navigate(`/products?category=${cat}`);
	};
	return (
		<div className="bg-white shadow-sm border-b">
			{/* 🔍 Search Bar */}
			<div className="max-w-8xl mx-auto  py-1">
				<div className="flex items-center bg-gray-100 rounded px-3">
					{/* Icon */}
					<span className="text-gray-500 mr-2">🔍</span>

					{/* Input */}
					<input
						type="text"
						placeholder="Search products..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleSearch}
						className="w-full border p-2 rounded"
					/>
				</div>
			</div>

			{/* 🧭 Categories */}
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex overflow-x-auto gap-8 py-3 text-sm font-medium text-gray-700 no-scrollbar">
					{categories.map((item, index) => (
						<div
							key={item}
							onClick={() => handleCategory(item)}
							className="whitespace-nowrap cursor-pointer hover:text-blue-600 transition">
							{item}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryBar;
