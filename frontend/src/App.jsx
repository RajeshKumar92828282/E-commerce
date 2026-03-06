import React, { useState } from 'react'
import { BrowserRouter ,Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
 import Category1 from './Components/categorybarr/Category1'
import Allproduct from './Components/allproduct/Allproduct'
import Product from './assets/allproductimg/Product'
import Mens from './pages/categoryitem/Mens'
import Login from '../src/pages/auth/Login'
import Signup from './pages/auth/Signup'
import Profile from './pages/profile'
import Home from './pages/Home'
import Category from './Components/categorybarr/category'
import Cart from '../src/pages/cart/Cart'


const App = () => {
  const [items, setItems] = useState(Product)
  const [count,setcount]=useState(0);

  

const filterItems = (category) => {

       if(category==="all"){
        setItems(Product)
        return

       }


  const updatedItems = Product.filter( 
    (items)=> items.category === category
  );
  setItems(updatedItems);
};

  return (
    <BrowserRouter>

     <Navbar count={count} />
     

     
      <Routes>
    <Route
  path="/"
  element={
    <>
      
      <Category1 />

      
      <Home setcount={setcount} />
<Category
  filterItems={filterItems}
  setitems={setItems}
  allProducts={Product}
/>
    
      <Allproduct items={items} setcount={setcount} />
    </>
  }
/>
        
        <Route path='/Login' element={<Login />} />
        <Route path="/mens" element={<Mens />} />
        <Route path='/Signup' element={< Signup />} />
       <Route path='/profile' element={<Profile />} />
       <Route path='/cart' element={<Cart />} />
       
      </Routes>
    </BrowserRouter>
    
  )
}

export default App