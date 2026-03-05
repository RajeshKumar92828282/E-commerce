require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static("upload"));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("✓ MongoDB connected successfully"))
  .catch((err) => {
    console.error("✗ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/cart", require("./routes/cartroutes"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server is running on port ${PORT}`);
});