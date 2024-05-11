import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { UserContext } from "../../../context/User";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { LoadingContext } from "../../../context/LoadingContextProvider";
import CheckoutPage from "../../Shop/CheckoutPage";

function Cart() {
 
  const [accessToken, setAccessToken] = useState("");
  const { userToken } = useContext(UserContext);
  const [cartItem, setCartItem] = useState([]);
  const { withLoading, loading } = useContext(LoadingContext);


  async function getCart() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/cart`,

      {
        headers: {
          Authorization: `Tariq__${userToken}`,
        },
      }
    );
    setCartItem(data.products);
  }
  useEffect(() => {
    withLoading(cartItem, "getCartItem");
    getCart();
  }, []);



  const handleIncreaseQuantity = async (id) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/incraseQuantity`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Tariq__${userToken}`,
          },
        }
      );

      if (data.message == 'success') {
        getCart()
      }

      
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };



  const handleDecreaseQuantity = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/decraseQuantity`,
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
      
        getCart()
      }

    } catch (error) {
      console.error("Error occurred:", error);
    }
  };


  const removeItem = async (id) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/removeItem`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Tariq__${userToken}`,
          },
        }
      );

      if (data.message == 'success') {
        getCart()
      }
     
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };


  return (
    <div>
      <PageHeader title={"Shop Cart"} currentPage={"Cart Page"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItem.map((item,id) => (
                    <tr key={id}>
                      <td className="product-item cat-product">
                        <div className="p-thumb ">
                          <img
                            src={item.details.mainImage.secure_url}
                            alt="Product's Image"
                          />
                        </div>
                        <div className="p-content">
                          <span>{item.details.name}</span>
                        </div>
                      </td>
                      <td className="cat-price">${item.details.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <button
                            className="dec qtybutton"
                            onClick={() => {
                              handleDecreaseQuantity(item.details._id)
                            }}
                            disabled={item.quantity == 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="cart-plus-minus-box"
                            name="qtybutton"
                            value={item.quantity}
                          />
                          <button
                            className="inc qtybutton"
                            onClick={() => handleIncreaseQuantity(item.details._id)}
                            disabled={item.quantity == item.details.stock}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="cat-toprice">
                        ${item.details.price * item.quantity}
                      </td>
                      <td className="
                      ">
                        <a href="#" onClick={() => removeItem(item.details._id)}>
                          X
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-bottom">
           
                <form className="cart-checkout ">
                  
                <div>
                  <CheckoutPage/>
                  </div>
                
                </form>
           
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
