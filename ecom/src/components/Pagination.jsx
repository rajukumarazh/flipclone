const Pagination = ({ page, setPage, totalPages }) => {
	if (totalPages <= 1) return null;
	return (
		<div className="flex justify-center gap-2 mt-6">
			<button
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
				className="px-3 py-1 border rounded">
				Prev
			</button>

			{[...Array(totalPages)].map((_, i) => (
				<button
					key={i}
					onClick={() => setPage(i + 1)}
					className={`px-3 py-1 border rounded ${
						page === i + 1 ? "bg-blue-500 text-white" : ""
					}`}>
					{i + 1}
				</button>
			))}

			<button
				disabled={page === totalPages}
				onClick={() => setPage(page + 1)}
				className="px-3 py-1 border rounded">
				Next
			</button>
		</div>
	);
};
export default Pagination;
