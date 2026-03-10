const mongoose = require("mongoose");
const Address = require("./Address");

const UserSchema = new mongoose.Schema(
	{
		user_id: mongoose.Schema.Types.ObjectId,
		name: String,
		email: String,
		password: String,
		role: String,
	},
	{ timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
