require("dotenv").config();
const express=require("express");

const mongoose=require("mongoose");
const cors=require("cors");
const app = express();
 

app.use(cors());
app.use(express.json());
app.use("/upload",express.static("upload"));

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

app.use("/api/auth",require("./routes/auth"));
app.use("/api/user",require("./routes/user"));

app.listen(5000,()=>console.log("server is running on 5000"));