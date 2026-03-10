import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartToast = ({ show, onClose }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => {
				onClose();
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [show]);

	if (!show) return null;

	return (
		<div className="fixed top-5 right-5 z-50 animate-slideIn">
			<div className="bg-white shadow-lg border-l-4 border-green-500 rounded-lg p-4 w-80">
				<div className="flex justify-between items-start">
					<div>
						<p className="text-green-600 font-semibold">
							✅ Item added to cart
						</p>
						<p className="text-sm text-gray-600 mt-1">
							Your product was added successfully.
						</p>
					</div>

					<button
						onClick={onClose}
						className="text-gray-400 hover:text-black">
						✕
					</button>
				</div>

				<button
					onClick={() => {
						navigate("/cart");
						onClose();
					}}
					className="mt-3 w-full bg-orange-500 text-white py-2 rounded font-medium">
					GO TO CART
				</button>
			</div>
		</div>
	);
};

export default CartToast;
