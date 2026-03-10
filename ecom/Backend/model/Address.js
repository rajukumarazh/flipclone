const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
	{
		name: String,
		address: String,
		pincode: Number,
		phone: Number,
		//user_id: mongoose.Schema.Types.ObjectId,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Address", AddressSchema);
