const mongoose = require("mongoose");
const Address = require("./Address");
const OrderSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		// address: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "Address",
		// },
		products: [
			{
				title: String,
				product_id: mongoose.Schema.Types.ObjectId,
				quantity: Number,
				price: Number,
				image: String,
				id: Number,
			},
		],
		totalAmount: Number,
		payment_id: String,
		status: String,
		address_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
