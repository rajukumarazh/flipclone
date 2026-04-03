const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Address = require("../model/Address");
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../model/Order");

router.post("/signup", async (req, res) => {
	const newUser = new User(req.body);
	const saved = await newUser.save();
	console.log("req.body", saved);
	res.json(saved);
});
router.post("/login", async (req, res) => {
	let { email, password } = req.body;
	const user = await User.findOne({ email, password });
	const token = jwt.sign(
		{ password: user.password, email: user.email }, // payload
		process.env.JWT_SECRET, // secret
		{ expiresIn: "1d" }, // expiry
	);
	res.json({ userdata: user, login: true, token: token });
	// console.log("kkkkk", req.body);
});
router.get("/islogin", authMiddleware, async (req, res) => {
	const user = await User.findOne({ email: req.user.email });

	res.json(user);
	//console.log("userlgoindata", user);
});
router.post("/address", async (req, res) => {
	//console.log("res", req.body);
	const newAddress = new Address(req.body);
	const saved = await newAddress.save();

	res.json(saved);
});
router.post("/user_addresses", async (req, res) => {
	console.log("user", req.body);
	try {
		const userId = req.body.user || req.body.user_id;
		const addresses = await Address.find({
			user: userId,
		}).populate("user");

		console.log("addresses:", addresses);

		res.json(addresses);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
router.put("/address/:id", async (req, res) => {
	console.log("kkkkkk", req.body.adress);
	const updated = await Address.findOneAndUpdate(
		{ _id: req.params.id },
		req.body.adress,
		{
			returnDocument: "after",
		},
	);
	console.log("RES", updated);
	res.json(updated);
});
router.delete("/address/:id", async (req, res) => {
	try {
		const id = req.params.id; // get id from URL
		// console.log("dkfdkf", deleted);
		const deleted = await Address.findByIdAndDelete(id);
		// console.log("dkfdkf", deleted);
		res.json(deleted); // send deleted document back
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
router.put("/update_address_category/:id", async (req, res) => {
	console.log("reqofdefault", req.body);

	try {
		const userId = req.body.user_id;

		// ❌ remove default from all addresses
		await Address.updateMany(
			{ user: userId },
			{ $set: { isDefault: false } },
		);

		// ✅ set selected address as default
		const updated = await Address.findByIdAndUpdate(
			req.body.id,
			{
				isDefault: true,
				category: "home",
			},
			{ new: true },
		);
		console.log("updated", updated);
		res.json(updated);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
router.get("/admin/users", async (req, res) => {
	try {
		let adminuser = await User.find();
		console.log("useradminerror", adminuser);
		res.json(adminuser);
	} catch (error) {
		console.log("useradminerror", error);
	}
});

module.exports = router;
