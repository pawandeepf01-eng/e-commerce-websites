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
    console.log(req.userId);
      if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
  
    const orders = await order.find({ userId: mongoose.Types.ObjectId(req.userId) }); // Fetch all items in cart collection
    res.status(200).json(orders);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message });
  }
};



module.exports={addorder,getorder}