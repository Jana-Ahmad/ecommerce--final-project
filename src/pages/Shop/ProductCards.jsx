/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

function ProductCards({ GridList, products }) {
    
  return (
    <div
      className={`shop-product-wrap row justify-content-center${
        GridList ? "grid" : "list"
      }`}
    >
      {products.allProducts.map((product, i) => (
        <div key={i} className="col-lg-4 col-md-6 col-sm-12">
          <div className="product-item">
            <div className="product-thumb">
                <div className="pro-thumb">
                    <img src={product.mainImage.secure_url} alt="Product's Image"/>
            </div>
            <div className="product-action-link">
                <Link to={`/shop/${product.id}`}>
                <i className="icofont-eye"></i>
                </Link>
                <a href="#"><i className="icofont-heart"></i></a>
                <Link to="/cart">
                <i className="icofont-cart-alt"></i>
                </Link>
            </div>  
            </div>
            <div className="product-content">
                <h5>
                    <Link to={`/shop/${product.id}`}>{product.name}</Link>
                </h5>
                <p className="productRating">
                <Link to={`/shop/${product.id}`}> <Rating rating={product.avgRating} /></Link>
                </p>
                <h6>
                   ${product.price} 
                </h6>
          </div>
        </div>

   

        </div>
      ))}
     </div>
  );
}

export default ProductCards;
