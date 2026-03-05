const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be positive"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, "Quantity must be at least 1"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);