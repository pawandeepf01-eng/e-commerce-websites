const Product = require("../model/product.js");

const addproducts = async (req, res) => {
  try {
    const { name, price, discription } = req.body;
    const imgPath = req.file ? req.file.filename : null;
    const newproduct = new Product({ name, price, discription, img: imgPath });
    await newproduct.save();
    res.status(200).json({ message: "product add suucesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};


const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params; // get id from URL
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const detailproduct = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.json(products);
  } catch (err) {
    res.status(500).json({ err: "product not find" });
  }
};

module.exports = { getProducts, detailproduct, addproducts,deleteproduct };
