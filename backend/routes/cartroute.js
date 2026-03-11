const express = require("express");
const router = express.Router();


const  {addcart,getcart,deleteCart}=require("../controller/cartcontroller.js")




router.post("/addcart", addcart)
router.get("/cart",getcart)
router.delete("/deletecart/:id", deleteCart);


module.exports = router;