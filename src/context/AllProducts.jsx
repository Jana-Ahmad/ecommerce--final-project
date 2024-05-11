import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export const ProductsContext= createContext();
 const ProductsContextProvider= ({children})=>{
    const [allProducts, setAllProducts] = useState([]);
    const getAllProducts = async () => {

        const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products?&limit=10`,
     
       );
       setAllProducts(data.products);
     };
     useEffect(() => {
       getAllProducts();
     
     }, []);
    
    
     return <ProductsContext.Provider value={{allProducts}}>
     {children};
   </ProductsContext.Provider>
 }
 export default ProductsContextProvider