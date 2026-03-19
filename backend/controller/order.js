const order = require("../model/order.js");



const addorder = async (req, res) => {
  try {
    

    const { productname,address,img, price, customerName, email, phone,} = req.body;
    const newcart = new order({userId: req.userId,productname, address,img, price, customerName, email, phone,});
    await newcart.save();
    res.status(200).json({ message: "product add suucesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getorder = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    let orders;

    if (req.role === "admin") {
      // Admin sees all orders
      orders = await order.find();
    } else {
      // Normal user sees only their orders
      orders = await order.find({ userId: req.userId });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};



module.exports={addorder,getorder}