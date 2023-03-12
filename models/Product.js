const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  p_name: {
    type: String,
    required: [true, "Please provide first product name"],
    trim: true,
    minlength: 1,
  },

  p_price: {
    type: String,
    required: [true, "Please provide first product price"],
  },

  p_description: {
    type: String, 
    minlength: 5,
    required: [true, "Please provide product description"],
  },

  p_outOfStock: {
    type: Boolean,
    required: [true, "Please mention product is in stock or not"],
  },

  p_image: {
    type: String,
  },
  
});

module.exports = mongoose.model("Product", ProductSchema);
