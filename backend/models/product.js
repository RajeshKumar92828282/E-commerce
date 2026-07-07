const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    brand: { type: String, trim: true, default: "Generic" },
    category: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, min: 0 },
    stock: { type: Number, default: 100, min: 0 },
    rating: {
      average: { type: Number, default: 4.2, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
