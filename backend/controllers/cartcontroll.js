const Cart = require("../models/cart");
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

// Add item to cart
exports.addtocard = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { title, price, image, quantity, productId } = req.body;

    if (!title || !price || !image) {
      return res.status(400).json({ error: "Missing required fields: title, price, image" });
    }

    const item = new Cart({
      userId,
      productId: productId || null,
      title,
      price,
      image,
      quantity: quantity || 1,
    });

    const savedItem = await item.save();

    res.status(201).json({ message: "Item added to cart successfully", item: savedItem });
  } catch (err) {
    console.error("Error adding to cart:", err);
    const status = err.message === "No token provided" ? 401 : 500;
    res.status(status).json({ error: err.message });
  }
};

// Get all cart items for logged-in user
exports.getcard = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const items = await Cart.find({ userId });
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching cart:", err);
    const status = err.message === "No token provided" ? 401 : 500;
    res.status(status).json({ error: err.message });
  }
};

// Delete item from cart
exports.deleteitem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid item ID" });
    }

    const deletedItem = await Cart.findOneAndDelete({ _id: id, userId });

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully", item: deletedItem });
  } catch (err) {
    console.error("Error deleting item:", err);
    const status = err.message === "No token provided" ? 401 : 500;
    res.status(status).json({ error: err.message });
  }
};