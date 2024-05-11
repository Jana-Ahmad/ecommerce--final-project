import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Await, Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

import { UserContext } from "../../context/User";
import Rating from "../Rating/Rating";

import { toast } from "react-toastify";


function ProductDisplay({ item }) {

console.log(item)

  const {
    avgRating,
    _id: productId,
    price,
    name,
    sizes,
    description,
    reviews,
    number_sellers,
    mainImage,
  } = item;

 
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");
  

  const [accessToken, setAccessToken] = useState("");
  const {userToken} = useContext(UserContext);


  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  

  const addToCart = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${userToken}`,
          },
        }
      );
    
      if (data.message == 'success') {
        toast.success("Product Added Successfully!")
        // TODO: Refresh Cart
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
  };

  return (
    <div>
      <div>
        <h4>{name}</h4>
        <p className="rating">
          <Rating rating={avgRating} />
          <span>{reviews?.length || 0} review</span>
        </p>
        <h4>${price}</h4>
        <span>{description}</span>
      </div>

      <div>
        <div>
          <div className="select-product size">
            <select value={size} onChange={handleSizeChange}>
              <option>Select Size</option>
              <option>SM</option>
              <option>MD</option>
              <option>LG</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            </div>
            

          <div className="select-product color">
            <select value={color} onChange={handleColorChange}>
              <option>Select Color</option>
              <option>White</option>
              <option>Black</option>
              <option>Gray</option>
            </select>
            </div>
          

        
          <button type="button" className="lab-btn" onClick={addToCart}>
            <span>Add to Cart</span>
          </button>

          <Link to="/Cart" className="lab-btn bg-primary">
            <span>Check Out</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay;
