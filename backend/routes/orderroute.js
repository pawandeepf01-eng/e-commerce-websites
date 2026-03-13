const express = require("express");
const router = express.Router();


const  {addorder,getorder}=require("../controller/order.js")




router.post("/addorder", addorder);
router.get("/order", getorder)



module.exports = router;