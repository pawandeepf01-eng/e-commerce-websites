const express = require("express");
const { newuser,loginuser, getuser,deleteuser,logoutUser } = require("../controller/controluser.js");


const router = express.Router();

router.post("/register",newuser);
router.post("/login", loginuser);
router.get("/showuser", getuser);
router.delete("/deleteuser/:id",deleteuser);
router.post("/logout",logoutUser)


module.exports = router;
