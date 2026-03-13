const express = require("express");
const router = express.Router();


const  {addorder,getorder}=require("../controller/order.js")
const { authMiddleware} = require("../middlware/auth.js");




router.post("/addorder",authMiddleware, addorder);
router.get("/order",authMiddleware, getorder)



module.exports = router;