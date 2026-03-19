const { Schema, model } = require("mongoose");

const myschema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const mymodel = model("join", myschema);
module.exports = mymodel;
