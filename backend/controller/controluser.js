const user = require("../model/model.js");

const dotenv=require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const newuser = async (req, res) => {
  try {
    const { userName, Email, Password } = req.body;

    const hasspassword = await bcrypt.hash(Password, 10);
    const newuser = new user({
      userName,

      Email,

      Password: hasspassword,
    });
    await newuser.save();

    const token = jwt.sign(
      { id: newuser._id, role: newuser.role, name: newuser.userName },
      process.env.Hello,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({
      message: "user register succesfully",
      token,
      role: newuser.role,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const loginuser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const newuser = await user.findOne({ Email });
    if (!newuser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(Password, newuser.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: newuser._id, role: newuser.role, name: newuser.userName },
      process.env.Hello,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res
      .status(200)
      .json({ message: "loggin succesfully", token, role: newuser.role });
    // console.log(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getuser = async (req, res) => {
  try {
    const data = await user.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};



const deleteuser = async (req, res) => {
  try {
    const { id } = req.params; // get id from URL
    await user.findByIdAndDelete(id);

    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // true if HTTPS
    sameSite: "None", // must match login
  });
  res.json({ message: "Logged out successfully" });
};

module.exports = { newuser, loginuser,getuser,deleteuser, logoutUser };
