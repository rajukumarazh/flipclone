const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
	{
		name: String,
		address: String,
		zip: Number,
		phone: Number,
		category: String,
		isDefault: {
			type: Boolean,
			default: false,
		},
		//user_id: mongoose.Schema.Types.ObjectId,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Address", AddressSchema);
