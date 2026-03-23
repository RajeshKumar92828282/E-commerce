const express=require("express");
const router=express.Router();
const Wishlist=require("../models/wishlist");
const mongoose = require("mongoose");

router.post("/add", async (req, res) => {
  try {
    console.log("Wishlist request body:", req.body);

    const { userId, productId, title, price, image } = req.body;
    if (!userId || !productId || !title || !price) {
      return res.status(400).json({ error: "Missing required fields: userId, productId, title, price" });
    }

    // Validate userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format. Must be a valid MongoDB ID." });
    }

    // Create the wishlist item - productId can be a string or ObjectId
    const item = new Wishlist({
      userId: new mongoose.Types.ObjectId(userId),
      productId: mongoose.Types.ObjectId.isValid(productId) 
        ? new mongoose.Types.ObjectId(productId) 
        : productId, // Allow string IDs for products from JSON
      title,
      price,
      image
    });
    await item.save();
    res.json({ message: "Wishlist item added successfully", item });
  } catch (err) {
    console.error("Wishlist add error:", err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/:userId",async(req,res)=>{
    try{
        const { userId } = req.params;
        
        // Validate that userId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: "Invalid User ID format" });
        }
        
        const wishlist = await Wishlist.find({ userId: new mongoose.Types.ObjectId(userId) });
        res.json(wishlist);
    }catch(err){
        console.error("Wishlist fetch error:", err);
        res.status(500).json({ error: err.message});
    }
});

// Remove from wishlist
router.delete("/remove/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json({ error: "Missing userId or productId" });
    }
    
    const objectIdUserId = mongoose.Types.ObjectId.isValid(userId) 
      ? new mongoose.Types.ObjectId(userId) 
      : userId;
    
    const result = await Wishlist.deleteOne({ 
      productId: productId,
      userId: objectIdUserId 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }
    
    res.json({ message: "Wishlist item removed successfully" });
  } catch (err) {
    console.error("Wishlist delete error:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports=router;