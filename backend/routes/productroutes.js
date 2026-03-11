const express = require("express");
const router = express.Router();
const { getProducts,detailproduct,addproducts, deleteproduct } = require("../controller/productcontroller.js");
const { authMiddleware ,checkAdmin} = require("../middlware/auth.js");


const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });


router.post("/add",authMiddleware,checkAdmin,upload.single("img"),addproducts)
router.get("/products", getProducts);
router.get("/products/:id", detailproduct)
router.delete("/deleteproduct/:id", deleteproduct)






module.exports = router;