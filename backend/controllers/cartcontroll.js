const Cart = require("../models/cart");

// Add item to cart
exports.addtocard = async (req, res) => {
  try {
    const { title, price, image, quantity } = req.body;

    // Validate required fields
    if (!title || !price || !image) {
      return res.status(400).json({
        error: "Missing required fields: title, price, image",
      });
    }

    const item = new Cart({
      title,
      price,
      image,
      quantity: quantity || 1,
    });

    const savedItem = await item.save();

    res.status(201).json({
      message: "Item added to cart successfully",
      item: savedItem,
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all cart items
exports.getcard = async (req, res) => {
  try {
    const items = await Cart.find();
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete item from cart
exports.deleteitem = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid item ID" });
    }

    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({
      message: "Item deleted successfully",
      item: deletedItem,
    });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: err.message });
  }
};