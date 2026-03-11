const { Schema, model } = require("mongoose");

const myschema = new Schema({
  name: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

});

const mymodel = model("cart", myschema);
module.exports = mymodel;
