/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/User";

function ProductCards({ GridList, products }) {

  const [accessToken, setAccessToken] = useState("");
  const {userToken} = useContext(UserContext);
 const {_id} = products

  const addToCart = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/cart`,
        {
          _id,
        },
        {
          headers: {
            Authorization: `Tariq__${userToken}`,
          },
        }
      );
    
      if (data.message == 'success') {
        toast.success("Product Added Successfully!")
        
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }}
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
                <img src={product.mainImage.secure_url} alt="Product's Image" />
              </div>
              <div className="product-action-link">
                <Link to={`/shop/${product._id}`}>
                  <i className="icofont-eye"></i>
                </Link>
                <a href="#">
                  <i className="icofont-heart"></i>
                </a>
                <Link to="/cart">
                  <i className="icofont-cart-alt">{addToCart}</i>
                </Link>
              </div>
            </div>
            <div className="product-content">
              <h5>
                <Link to={`/shop/${product._id}`}>{product.name}</Link>
              </h5>
              <p className="productRating">
                <Link to={`/shop/${product._id}`}>
                  {" "}
                  <Rating rating={product.avgRating} />
                </Link>
              </p>
              <h6>${product.price}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCards;
