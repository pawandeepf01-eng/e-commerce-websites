const order = require("../model/order.js");



const addorder = async (req, res) => {
  try {
    

    const { productname,address,img, price, customerName, email, phone,} = req.body;
    const newcart = new order({ userId: req.user.id,productname, address,img, price, customerName, email, phone,});
    await newcart.save();
    res.status(200).json({ message: "product add suucesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getorder = async (req, res) => {
  try {
  
    const orders = await order.find({userId: req.user.id}); // Fetch all items in cart collection
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports={addorder,getorder}