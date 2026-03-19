const order = require("../model/order.js");

const addorder = async (req, res) => {
  try {
    const { productname, address, img, price, customerName, email, phone } =
      req.body;
    const newcart = new order({
      userId: req.userId,
      productname,
      address,
      img,
      price,
      customerName,
      email,
      phone,
    });
    await newcart.save();
    res.status(200).json({ message: "product add suucesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getorder = async (req, res) => {
  try {
    const orders = await order.find({ userId: req.userId }); // Fetch all items in cart collection
    res.status(200).json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

const admingetorder = async (req, res) => {
  try {
    const aorders = await order.find();
    res.status(200).json(aorders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addorder, getorder ,admingetorder};
