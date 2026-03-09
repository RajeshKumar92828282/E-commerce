const express=require("express");
const router=express.Router();
const Wishlist=require("../models/wishlist");
const { models } = require("mongoose");

router.post("/add", async (req, res) => {
  try {
    console.log("Wishlist request body:", req.body);

    const { userId, productId, title, price } = req.body;
    if (!userId || !productId || !title || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const item = new Wishlist(req.body);
    await item.save();
    res.json({ message: "Wishlist item added successfully", item });
  } catch (err) {
    console.error("Wishlist add error:", err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/:userId",async(req,res)=>{
    try{
        
        const wishlist=await Wishlist.find({ userId: someUserId }).populate("productId");
        res.json(wishlist);
    }catch(err){
        res.status(500).json({ error: err.message});
    }
});

// Remove from wishlist
router.delete("/remove/:productId", async (req, res) => {
  try {
    await Wishlist.deleteOne({ productId: req.params.productId, userId: req.body.userId });
    res.json({ message: "Wishlist item removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports=router;