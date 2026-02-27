import { useNavigate } from "react-router-dom";
import "./Category1.css";
import fashion from "../../assets/imgicon/image.png";
import mobiles from "../../assets/imgicon/mobile.webp";
import travel from "../../assets/imgicon/travel.webp";
import kitchen from "../../assets/imgicon/kitchen.webp";
import appliances from "../../assets/imgicon/appliances.webp";
import beauty from "../../assets/imgicon/beauty.webp";
import ele from "../../assets/imgicon/ele.webp";


export default function Category1(){
    const navigate =useNavigate();

    return (
        <div className="category-container">
            <div className="category-section">
                <div className="category-card" onClick={()=>navigate("/fashion")}>
                    <div className="icon-box">
                        <img src={fashion} alt="fashion" />
                    </div>
                    <p>Fashion</p>

                </div>
            </div>
            <div className="category-section">
                <div className="category-card" onClick={()=>navigate("/Mobiles")}>
                    <div className="icon-box">
                        <img src={mobiles} alt="mobiles" />
                    </div>
                    <p>Mobiles</p>

                </div>
            </div>
            <div className="category-section">
                <div className="category-card" onClick={()=>navigate("/Travel")}>
                    <div className="icon-box">
                        <img src={travel} alt="travel" />
                    </div>
                    <p>Travel</p>

                </div>
            </div>
            <div className="category-section">
                <div className="category-card" onClick={()=>navigate("/kitchen")}>
                    <div className="icon-box">
                        <img src={kitchen} alt="kitchen" />
                    </div>
                    <p>Kitchen</p>

                </div>
            </div>
            <div className="category-section">
                <div className="category-card" onClick={()=>navigate("/Appliances")}>
                    <div className="icon-box">
                        <img src={appliances} alt="appliances" />
                    </div>
                    <p>Appliances</p>

                </div>
            </div>
            <div className="category-section">
                <div className="category-card" onClick={()=>navigate("/Beauty")}>
                    <div className="icon-box">
                        <img src={beauty} alt="beauty" />
                    </div>
                    <p>Beauty</p>

                </div>
            </div>
            <div className="category-section">
                <div className="category-card" onClick={()=>navigate("/Electronics")}>
                    <div className="icon-box">
                        <img src={ele} alt="electronics" />
                    </div>
                    <p>Electronics</p>

                </div>
            </div>
        </div>
    )
}