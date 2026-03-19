const bcrypt = require("bcrypt");
const joinuser = require("../model/join.js");

const newjoin = async (req, res) => {
  try {
    const { userName, Email, Password } = req.body;

    const hasspassword = await bcrypt.hash(Password, 10);
    const newuser = new joinuser({
      userName,

      Email,

      Password: hasspassword,
    });
    await newuser.save();

    res.status(200).json({
      message: "user register succesfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { newjoin };
