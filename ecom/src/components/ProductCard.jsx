import { Link } from "react-router-dom";

const ProductCard = ({ props }) => {
	//console.log("prpos", props);

	return (
		<div className="bg-white p-4 rounded shadow hover:shadow-xl transition group">
			<Link
				key={props?.id}
				to={`/details/${props?.id}`}
				className="h-40 flex items-center justify-center">
				<img
					src={props?.image}
					alt="product"
					className="h-full object-contain group-hover:scale-105 transition"
				/>
			</Link>

			<h2 className="mt-3 text-sm font-medium line-clamp-2">
				{props?.title}
			</h2>

			<div className="mt-2 flex items-center gap-2">
				<span className="text-lg font-bold text-gray-800">
					₹{props?.price}
				</span>
				<span className="text-sm line-through text-gray-400">
					₹1999
				</span>
				<span className="text-green-600 text-sm font-medium">
					50% off
				</span>
			</div>
		</div>
	);
};

export default ProductCard;
