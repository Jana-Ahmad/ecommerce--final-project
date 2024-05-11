import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/User";
import { LoadingContext } from "../../../context/LoadingContextProvider";
import axios from "axios";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams("id");
  const [accessToken, setAccessToken] = useState("");
  const { userToken } = useContext(UserContext);
  const [orderItems, setOrderItems] = useState([]);
  const { withLoading, loading } = useContext(LoadingContext);
  

  async function getOrder() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/order`,

      {
        headers: {
          Authorization: `Tariq__${userToken}`,
        },
      }
    );
    setOrderItems(data.orders);
  }
  useEffect(() => {
    withLoading(orderItems, "getOrder");
    getOrder();
  }, []);

  async function cancelOrder(){
    try{
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API}/order/cancel/${id}`,

      {
        headers: {
          Authorization: `Tariq__${userToken}`,
        },
      }
      
    );
  setOrderItems(data.order)
  if (data.message == 'success') {
    orderItems()
  }
 
} catch (error) {
  console.error("Error occurred:", error);
}
  }
  return (
    <div>
      <PageHeader title={"Your Orders"} currentPage={"Orders Page"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <div className="cart-top">
            <table>
                <thead>
                  <tr>
                    <th className="cat-id">Order ID</th>
                    <th className="cat-payment">Payment Type</th>
                    <th className="cat-date">Order Date</th>
                    <th className="cat-status">Order Status</th>
                    <th className="cat-total">Order Total</th>
                    <th className="cat-action">Order Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {orderItems.map((order,id) => (
                    <tr key={id}>
<td>{order._id}</td>
<td>{order.
paymentType
}</td>
<td>{order.createdAt}</td>
<td>{order.status}</td>
<td>${order.finalPrice}</td>
<td> <button
                          
                            onClick={() => {
                              cancelOrder(order._id)
                            }}
                            disabled={order.status =! "pending"}
                          >
                          Cancel order
                          </button></td>
</tr>
                  ))}
             
             </tbody>
              </table>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
