import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingContext } from "../../context/LoadingContextProvider";
import Loader from "../../components/Loader/Loader";
import { asyncHandler } from "../../components/utils/asyncHandler";

function CategoryProducts() {
  const { id } = useParams("id");
  const [products, setProducts] = useState([]);
  const {loading , withLoading}= useContext(LoadingContext)
  const getProducts = asyncHandler(async()=>{
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/products/category/${id}`
    );
    setProducts(data.products);
  });
  useEffect(() => {
    withLoading(()=>getProducts(),"getMyProducts")
  }, []);
  if (loading.getMyProducts) {
    return <Loader/>;
  } 
  

  return (
    <div className="section-wrapper " >
      <div className="container">
      <div className="product pt-5 row g-4 justify-content-center row-cols-m-4 row-cols-sm-3 row-cols-2">
      
        {products.map((product) => (
          <div className="col" key="product.-id">
            <div className="product-item pt-5">
            <div className="product-inner">
              <div className="product-thumb text-center">
              <img src={product.mainImage.secure_url} className="img-fluid img-thumbnail " width="70%"/>
              </div>
              <div className="procuct-content text-center">
                <div className="product-title ">
                  <h6>{product.name}</h6> 
        
                  <button className="btn btn-dark" onClick={() => getProducts(product._id)}>
              {" "}
              Add to Cart{" "}
            </button> 
              </div>
            </div>

            </div>
          </div>
          </div>
        ))}
      </div>
       </div>
    </div>
  );
}

export default CategoryProducts;
