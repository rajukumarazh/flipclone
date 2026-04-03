const express = require("express");
const router = express.Router();
// const Product = require("../models/Product");
const Product = require("../model/Product");

router.get("/products", async (req, res) => {
	// GET /api/products?page=1&limit=10
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 5;

	const skip = (page - 1) * limit;

	const total = await Product.countDocuments();

	const products = await Product.find().skip(skip).limit(limit);
	console.log("products", products);
	res.json({
		products,
		total,
		page,
		totalPages: Math.ceil(total / limit),
	});
});

router.put("/updateproduct/:id", async (req, res) => {
	console.log("kkkkkk", req.body);
	const updated = await Product.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{
			returnDocument: "after",
		},
	);
	//console.log("RES", updated);
	res.json(updated);
});
router.post("/insert", async (req, res) => {
	//console.log("helloAdmin", req.body);
	const product = new Product(req.body);
	const saved = await product.save();
	//console.log("saved", saved);
	res.json(saved);
});

module.exports = router;
