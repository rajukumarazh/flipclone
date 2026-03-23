const express = require("express");
const router = express.Router();
// const Product = require("../models/Product");
const Order = require("../model/Order");
const mongoose = require("mongoose");
// router.get("/", async (req, res) => {
// 	const products = await Product.find();
// 	res.json(products);
// });
router.get("/myorder/:user_id", async (req, res) => {
	try {
		const userid = req.params.user_id;

		// ✅ Validate ObjectId
		if (!mongoose.Types.ObjectId.isValid(userid)) {
			return res.status(400).json({ message: "Invalid user ID" });
		}

		// ✅ Fetch orders with details
		const orders = await Order.find({ user_id: userid })
			// .populate("products.product_id") // get product details
			.populate("address_id"); // get address details

		res.json(orders);
	} catch (error) {
		console.error("Fetch Orders Error:", error);
		res.status(500).json({ error: error.message });
	}
});
router.post("/create_order", async (req, res) => {
	const order = new Order(req.body);
	const saved = await order.save();
	console.log("saved", saved);
	res.json(saved);
});

module.exports = router;
