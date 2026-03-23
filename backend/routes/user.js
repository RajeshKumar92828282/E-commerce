const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Get user profile
router.get("/profile", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        const user = await User.findById(decoded.id);
        
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            address: user.address || "",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update user profile
router.put("/profile", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        const { name, phone, address } = req.body;

        const updated = await User.findByIdAndUpdate(
            decoded.id,
            { name, phone, address },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "User not found" });

        res.json({
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            phone: updated.phone || "",
            address: updated.address || "",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

