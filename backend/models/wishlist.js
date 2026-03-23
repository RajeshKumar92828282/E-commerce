const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.Mixed, // Allows both ObjectId and String
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);