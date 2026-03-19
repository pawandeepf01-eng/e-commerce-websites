const express = require("express");
const { newjoin } = require("../controller/join.js");

const router = express.Router();

router.post("/join", newjoin);

module.exports = router;
