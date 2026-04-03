import React from "react";

export default function PreviewModal({ isOpen, onClose, image, onUpload }) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={onClose}>
			<div
				className="bg-white p-6 rounded-xl w-[600px] max-w-[90%]"
				onClick={(e) => e.stopPropagation()}>
				<h2 className="text-lg font-semibold mb-3">
					Image Preview
				</h2>

				{image && (
					<img
						src={image}
						className="w-full h-[350px] object-contain rounded"
						alt="preview"
					/>
				)}

				<div className="flex justify-between mt-4">
					<button
						onClick={onClose}
						className="px-3 py-1 bg-gray-400 text-white rounded">
						Cancel
					</button>

					{onUpload && (
						<button
							onClick={onUpload}
							className="px-3 py-1 bg-blue-500 text-white rounded">
							Upload
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
