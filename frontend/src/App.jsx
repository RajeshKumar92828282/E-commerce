import React, { useState } from 'react'
import { BrowserRouter ,Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Category from './Components/categorybarr/Category'
import Allproduct from './Components/allproduct/Allproduct'
import Product from './assets/allproductimg/Product'
import Mens from './pages/categoryitem/Mens'
import Category1 from './Components/categorybarr/Category1'
import Login from '../src/pages/auth/Login'
import Signup from './pages/auth/Signup'


const App = () => {
  const [items, setItems] = useState(Product)

  

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

     <Navbar />
     

     
      
      <Routes>

        <Route path="/" element={<>
        <Category1 />
         <Category 
      filterItems={filterItems}
      setitems={setItems}
      allProducts={Product}  
      
      />
       <Allproduct items={items} />
        </>}/>
        <Route path='/Login' element={<Login />} />
        <Route path="/mens" element={<Mens />} />
        <Route path='/Signup' element={< Signup />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App