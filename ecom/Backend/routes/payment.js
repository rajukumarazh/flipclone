// routes/payment.js
const express = require("express");
const router = express.Router();
const razorpay = require("../config/razorpay");
//const razoypay=require("../config/razorpay")
const crypto = require("crypto");
router.post("/create-order", async (req, res) => {
	try {
		const { amount } = req.body;

		// 🔥 ADD THIS CHECK
		if (!amount) {
			return res.status(400).json({ message: "Amount is required" });
		}

		console.log("Amount received:", amount);

		const options = {
			amount: amount * 100, // convert to paisa
			currency: "INR",
			receipt: "receipt_" + Date.now(),
		};
		console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
		console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
		const order = await razorpay.orders.create(options);

		res.json({
			success: true,
			order,
		});
	} catch (error) {
		// res.status(500).json({ error: error.message });

		console.log("------ ERROR START ------");
		console.log("Status:", error.statusCode);
		console.log("Error:", error.error);
		console.log("Message:", error.message);
		console.log("------ ERROR END ------");

		res.status(500).json({ error: error.message });
	}
});

router.post("/verify-payment", (req, res) => {
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
		req.body;
	console.log("codddd", req.body);
	const body = razorpay_order_id + "|" + razorpay_payment_id;

	const expectedSignature = crypto
		.createHmac("sha256", "TzXWYUJ10BEJs2jXQLi7gwu6")
		.update(body.toString())
		.digest("hex");
	console.log("expectedSignature", expectedSignature);
	if (expectedSignature === razorpay_signature) {
		return res.json({
			success: true,
			message: "Payment verified",
		});
	} else {
		return res.status(400).json({
			success: false,
			message: "Invalid signature",
		});
	}
});

module.exports = router;
