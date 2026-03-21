// config/razorpay.js
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
	key_id: "rzp_test_SSuHvi6tcJdFE5",
	key_secret: "TzXWYUJ10BEJs2jXQLi7gwu6",
});

module.exports = razorpay;
