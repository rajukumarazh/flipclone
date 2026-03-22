const mongoose = require("mongoose");
const Address = require("./Address");
const OrderSchema = new mongoose.Schema(
	{
		user_id: mongoose.Schema.Types.ObjectId,
		products: [
			{
				title: String,
				product_id: mongoose.Schema.Types.ObjectId,
				quantity: Number,
				price: Number,
				image: String,
			},
		],
		totalAmount: Number,
		payment_id: String,
		address_id: mongoose.Schema.Types.ObjectId,
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
