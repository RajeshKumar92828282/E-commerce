const express = require("express");
const router = express.Router();
const Wishlist = require("../models/wishlist");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
  if (!decoded || !decoded.id) {
    throw new Error("Invalid token");
  }
  return decoded.id;
};

router.post("/add", async (req, res) => {
  try {
    const tokenUserId = getUserIdFromToken(req);

    const { userId, productId, title, price, image } = req.body;
    if (!userId || !productId || !title || !price) {
      return res.status(400).json({ error: "Missing required fields: userId, productId, title, price" });
    }

    if (tokenUserId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format. Must be a valid MongoDB ID." });
    }

    const item = new Wishlist({
      userId: new mongoose.Types.ObjectId(userId),
      productId: mongoose.Types.ObjectId.isValid(productId) ? new mongoose.Types.ObjectId(productId) : productId,
      title,
      price,
      image,
    });

    await item.save();
    res.json({ message: "Wishlist item added successfully", item });
  } catch (err) {
    console.error("Wishlist add error:", err);
    const status = err.message === "No token provided" ? 401 : 500;
    res.status(status).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const tokenUserId = getUserIdFromToken(req);
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    if (tokenUserId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const wishlist = await Wishlist.find({ userId: new mongoose.Types.ObjectId(userId) });
    res.json(wishlist);
  } catch (err) {
    console.error("Wishlist fetch error:", err);
    const status = err.message === "No token provided" ? 401 : 500;
    res.status(status).json({ error: err.message });
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    const tokenUserId = getUserIdFromToken(req);
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId || !id) {
      return res.status(400).json({ error: "Missing userId or item id" });
    }

    if (tokenUserId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid wishlist item ID" });
    }

    const objectIdUserId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    const deletedItem = await Wishlist.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id), userId: objectIdUserId });

    if (!deletedItem) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    res.json({ message: "Wishlist item removed successfully" });
  } catch (err) {
    console.error("Wishlist delete error:", err);
    const status = err.message === "No token provided" ? 401 : 500;
    res.status(status).json({ error: err.message });
  }
});

module.exports = router;