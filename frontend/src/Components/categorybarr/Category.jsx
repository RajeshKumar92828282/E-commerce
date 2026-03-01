import React from "react"
import './Category.css'




export default function Category({filterItems}) {
  

  return (
    
    <div className="container">
    <div className="btn-group1">
      <button onClick={()=>filterItems("all")}>All</button>

      <button onClick={()=>filterItems("men's clothing")}>
        Men's clothing
      </button>
      <button onClick={() => filterItems("women's clothing")}>
          Women's Clothing
        </button>

        <button onClick={() => filterItems("electronics")}>
          Electronics
        </button>

        <button onClick={() => filterItems("jewelery")}>
          Jewelery
        </button>
    </div>
    </div>
  )

}