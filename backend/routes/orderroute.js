const express = require("express");
const router = express.Router();


const  {addorder,getorder,admingetorder}=require("../controller/order.js")

const { authMiddleware } = require("../middlware/auth.js");



router.post("/addorder",authMiddleware, addorder);
router.get("/order", authMiddleware, getorder)
router.get("/adminorder", authMiddleware,admingetorder)




module.exports = router;