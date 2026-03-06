const express = require("express");
const {
  addtocard,
  getcard,
  deleteitem,
} = require("../controllers/cartcontroll");

const router = express.Router();

// POST /api/cart/add - Add item to cart
router.post("/add", addtocard);

// GET /api/cart - Get all cart items
router.get("/", getcard);

// DELETE /api/cart/:id - Delete item from cart
router.delete("/:id", deleteitem);

module.exports = router;