
  
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';
import { UserContext } from '../../../context/User';
import { ProductsContext } from '../../../context/AllProducts';



function Cart() {
  const [accessToken, setAccessToken] = useState("");
  const products=useContext(ProductsContext);
  const Token = useContext(UserContext);
const [cartItems,setCartItems]=useState([]);

useEffect( ()=>{
 const storedCartItems = localStorage.getItem("cart") || [];
 setCartItems(storedCartItems)

},[])
 
const calculateTotalPrice =(item) => {
  return item.price * item.quantity;

}
 const handleIncrese= async(item) => {
  const data =  await axios.patch(
    `{${import.meta.env.VITE_API}cart/incraseQuantity}`,
    {
      productId: products.id,
     },

     {
       headers: {
         Authorization: `Tariq__${Token}`,
       },
     }
   );
  
  item.quantity +=1;
  setCartItems([...cartItems,data]);

  localStorage.setItem("cart",JSON.stringify(cartItems));
 }
 const handleDecrese= async(item) => {
  const data =  await axios.patch(
    `{${import.meta.env.VITE_API}cart/decraseQuantity}`,
    {
      pproductId: products.id,
     },

     {
       headers: {
         Authorization: `Tariq__${Token}`,
       },
     }
   );
  {
  if(item.quantity> 1){
    item.quantity -= 1;
    setCartItems([...cartItems,data]);
    localStorage.setItem("cart",JSON.stringify(cartItems));
  }
 }
}

 const handleRemoveItem= async(item) => {
  const data =  await axios.patch(
    `{${import.meta.env.VITE_API}cart/removeItem}`,
    {
      productId: products.id,
     },

     {
       headers: {
         Authorization: `Tariq__${Token}`,
       },
     }
   );
   const updatedCart = cartItems.filter((cartItem)=>cartItem.id !== item.id);
   setCartItems(updatedCart);
updateLocalStorage(updatedCart)
    }
const updateLocalStorage=(cart)=>{
localStorage.setItem("cart",JSON.stringify(cart));
}
const cartSubTotal = cartItems.reduce((total,item)=>{
  return total + calculateTotalPrice(item);
},0
)






  return (
    <div>
      <h1>Add to Cart</h1>
     </div>
      )
}
export default Cart;
