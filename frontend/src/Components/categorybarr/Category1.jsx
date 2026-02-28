import { useNavigate } from "react-router-dom";
import category from "./categorydata";
import "./Category1.css";



export default function Category1(){
    const navigate =useNavigate();

    return (
       <div className="category-wrapper">
        {category.map((cat,index)=>(
         <div
         key={index}
         className="category-card"
         onClick={()=>navigate(cat.path)}>
            <div className="icon-box">
                <img src={cat.image} alt={cat.name} />
            </div>
            <p>{cat.name}</p>

            </div>

        ))}
       </div>
    )
}