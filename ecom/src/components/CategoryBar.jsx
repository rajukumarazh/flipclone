const CategoryBar = () => {
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

	return (
		<div className="bg-white shadow-sm border-b">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex overflow-x-auto gap-8 py-3 text-sm font-medium text-gray-700 no-scrollbar">
					{categories.map((item, index) => (
						<div
							key={index}
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
