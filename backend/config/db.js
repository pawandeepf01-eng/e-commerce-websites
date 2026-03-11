const mongoose = require("mongoose");


const dotenv=require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongoose is connected");
  } catch (err) {
   
   console.log(err.message)
   process.exit(1)
  }
};

module.exports=connectDB