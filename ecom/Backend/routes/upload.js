const express = require("express");
const Router = express.Router();
const upload = require("../middleware/upload");

Router.post("/upload", upload.single("image"), (req, res) => {
	console.log(req.file);

	res.json({
		imageUrl: `http://localhost:5000/upload/${req.file.filename}`,
	});
});

module.exports = Router;
