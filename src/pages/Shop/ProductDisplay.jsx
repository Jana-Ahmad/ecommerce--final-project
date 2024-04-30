import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Await, Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ProtectedRoutes from "../../components/ProtectedRoutes/ProtectedRoutes";
import { UserContext } from "../../context/User";
import Rating from "../Rating/Rating";
import { ProductsContext } from "../../context/AllProducts";

function ProductDisplay({ item }) {
  const products=useContext(ProductsContext);
  const {
    avgRating,
    id,
    price,
    name,
    sizes,
    description,
    reviews,
    number_sellers,
    mainImage,
  } = item;

  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");
  const [preQuantity, setQuantity] = useState(number_sellers);
  const [cart, setCart] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const Token = useContext(UserContext);
const productId= id;
  const [message, setMessage] = useState("");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handleDecrease = () => {
    if (preQuantity > 1) {
      setQuantity(preQuantity - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity(preQuantity + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
      const cart = await axios.post(
        `${import.meta.env.VITE_API}/cart`,
        {
         productId,
        },

        {
          headers: {
            Authorization: `Tariq__${Token}`,
          },
        }
      );
      
      const existingCart = localStorage.getItem("cart") || [];
      const existingProductIndex = existingCart.findIndex(
        (item) => item.id === id
      );
      if (existingProductIndex !== -1) {
        existingCart[existingProductIndex].quantity += preQuantity;
      } else {
        existingCart.push(productId);
      }
      localStorage.setItem("cart");

   
    
  };

  return (
    <div>
      <div>
        <h4>{name}</h4>
        <p className="rating">
          <Rating rating={avgRating} />
          <span>{reviews.length} review</span>
        </p>
        <h4>${price}</h4>
        <span>{description}</span>
      </div>

      <div>
        <form>
          <div className="select-product size">
            <select value={size} onChange={handleSizeChange}>
              <option>Select Size</option>
              <option>SM</option>
              <option>MD</option>
              <option>LG</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>

          <div className="select-product color">
            <select value={color} onChange={handleColorChange}>
              <option>Select Color</option>
              <option>White</option>
              <option>Black</option>
              <option>Gray</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>

          <div className="cart-plus-minus">
            <div className="dec qtybutton" onClick={handleDecrease}>
              -
            </div>
            <input
              type="text"
              name="qtybutton"
              id="qtybutton"
              value={preQuantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="cart-plus-minus-box"
            />
            <div className="inc qtybutton" onClick={handleIncrease}>
              +
            </div>
          </div>

          <div className="discount-code mb-2">
            <input
              type="text"
              placeholder="Enter Discount Code"
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>

          <button type="submit" className="lab-btn" onClick={handleSubmit}>
            <span>Add to Cart</span>
          </button>

          <Link to="/Cart" className="lab-btn bg-primary">
            <span>Check Out</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ProductDisplay;
