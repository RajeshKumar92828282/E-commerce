const router=require("express").Router();
const User=require("../models/user");
const bcyrt=require("bcryptjs");
const jwt=require("jsonwebtoken");


router.post('/signup',async (req,res)=>{
    try {
        const hashed=await bcyrt.hash(req.body.password,10);

        const user =new User({
            name:req.body.name,
            email:req.body.email,
            password:hashed,
        });
        await user.save();
        res.json({message:"User created"});
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});

router.post('/login',async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(!user) return res.status(400).json({message:"user not found"});

        const valid=await bcyrt.compare(req.body.password,user.password);
        if(!valid) return res.status(400).json({message:"Wrong password"});

        const token =jwt.sign({id:user._id},"secretkey");
        res.json({
            token,
            user:{
                name:user.name,
                email:user.email,
                phone: user.phone || "",
                address: user.address || "",
            },
        });
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});

module.exports = router;
