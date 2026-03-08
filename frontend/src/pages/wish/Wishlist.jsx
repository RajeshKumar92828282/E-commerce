import React from 'react'
import '../../CSS/Wishlist.css'
const Wishlist = ({ wishlist }) => {
  return (
    <div>
      <h2>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id}>
            <img src={item.image} width="80" alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Wishlist