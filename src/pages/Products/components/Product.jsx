import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Product() {
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {

     const { data } = await axios.get(
     `https://ecommerce-node4-five.vercel.app/products?&limit=10`,
  
    );
    setAllProducts(data.products);
  };
  useEffect(() => {
    getAllProducts();
  
  }, []);


  



  return (
    <div>
    {
    allProducts.map(product=> 
      <div className="product">
        <h2>{product.name}</h2>
        <img src={product.mainImage.secure_url}></img>

      </div>
    )}

  </div>
  )
}

export default Product