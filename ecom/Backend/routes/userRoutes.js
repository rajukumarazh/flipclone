const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Address = require("../model/Address");
const authMiddleware = require("../middleware/authMiddleware");
// router.get("/", async (req, res) => {
// 	const products = await Product.find();
// 	res.json(products);
// });

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
	//console.log("user", user);
});
router.post("/address", async (req, res) => {
	console.log("res", req.body);
	const newAddress = new Address(req.body);
	const saved = await newAddress.save();
	//console.log("req.body", saved);
	res.json(saved);
});
router.post("/user_addresses", async (req, res) => {
	console.log("user", req.body.user_id);
	try {
		const addresses = await Address.find({
			user: req.body.user_id,
		}).populate("user");

		//console.log("addresses:", addresses);

		res.json(addresses);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
module.exports = router;
