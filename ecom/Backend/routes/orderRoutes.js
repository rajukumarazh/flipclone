const express = require("express");
const router = express.Router();
// const Product = require("../models/Product");
const Order = require("../model/Order");
const mongoose = require("mongoose");
const User = require("../model/User");
const Product = require("../model/Product");
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
/// admin routes for user
router.get("/admin/orders", async (req, res) => {
	console.log("query", req.query.status);
	// try {
	// 	const orders = await Order.find()
	// 		.populate("user_id") // 🔥 user details
	// 		.populate("address_id"); // 🔥 address details
	// 	console.log("orser", orders);
	// 	res.json(orders);
	// } catch (err) {
	// 	res.status(500).json({ error: err.message });
	// }

	const { page = 1, limit = 5, status, search } = req.query;

	let query = {};

	if (status) query.status = status;

	const orders = await Order.find(query)
		.populate("user_id")
		.populate("address_id")
		.skip((page - 1) * limit)
		.limit(limit);

	const total = await Order.countDocuments(query);

	res.json({
		orders,
		totalPages: Math.ceil(total / limit),
	});
});
router.put("/admin/orders/:id", async (req, res) => {
	console.log("kkkkkk", req.body);
	const updated = await Order.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{
			returnDocument: "after",
		},
	);
	console.log("RES", updated);
	// res.json(updated);
});
router.get("/admin/stats", async (req, res) => {
	const users = await User.countDocuments();
	const orders = await Order.countDocuments();
	const products = await Product.countDocuments();

	const revenue = await Order.aggregate([
		{ $group: { _id: null, total: { $sum: "$totalAmount" } } },
	]);

	res.json({
		users,
		orders,
		products,
		revenue: revenue[0]?.total || 0,
	});
});
router.get("/admin/revenue-chart", async (req, res) => {
	const data = await Order.aggregate([
		{
			$group: {
				_id: { $month: "$createdAt" },
				revenue: { $sum: "$totalAmount" },
			},
		},
		{
			$sort: { _id: 1 },
		},
	]);

	// format for frontend
	const formatted = data.map((item) => ({
		month: `Month ${item._id}`,
		revenue: item.revenue,
	}));

	res.json(formatted);
});
module.exports = router;
