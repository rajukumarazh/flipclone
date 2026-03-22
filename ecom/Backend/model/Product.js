const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
	rate: {
		type: Number,
		required: true,
	},
	count: {
		type: Number,
		required: true,
	},
});

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},

		description: {
			type: String,
			required: true,
		},

		category: {
			type: String,
			required: true,
		},

		image: {
			type: String,
			required: true,
		},

		price: {
			type: Number,
			required: true,
		},

		quantity: {
			type: Number,
			default: 1,
		},

		rating: ratingSchema,

		// optional: store fake API id
		fakeId: {
			type: Number,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Product", productSchema);

// process for inserting doc

// const Product = require("./models/Product");

// const product = await Product.create({
// 	title: "Mens Casual Premium Slim Fit T-Shirts",
// 	description: "Slim-fitting style...",
// 	category: "men's clothing",
// 	image: "https://fakestoreapi.com/img/...",
// 	price: 22.3,
// 	quantity: 1,
// 	rating: {
// 		rate: 4.1,
// 		count: 259,
// 	},
// 	fakeId: 2,
// });
