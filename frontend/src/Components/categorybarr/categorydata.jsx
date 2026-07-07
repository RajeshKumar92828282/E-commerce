
import React from "react";
import fashion from "../../assets/imgicon/image.png";
import mobiles from "../../assets/imgicon/mobile.webp";
import travel from "../../assets/imgicon/travel.webp";
import kitchen from "../../assets/imgicon/kitchen.webp";
import appliances from "../../assets/imgicon/appliances.webp";
import beauty from "../../assets/imgicon/beauty.webp";
import ele from "../../assets/imgicon/ele.webp";

const category=[
    {name: "Men's Clothing",image: fashion,slug:'mens-clothing',path:'/category/mens-clothing'},
    {name: "Mobile",image: mobiles,slug:'mobiles',path:'/category/mobiles'},
    {name: "Travel",image: travel,slug:'travel',path:'/category/travel'},
    {name: "Kitchen",image: kitchen,slug:'kitchen',path:'/category/kitchen'},
    {name: "Appliances",image: appliances,slug:'appliances',path:'/category/appliances'},
    {name: "Beauty",image: beauty,slug:'beauty',path:'/category/beauty'},
    {name: "Electronics",image: ele,slug:'electronics',path:'/category/electronics'},

];

export default category;