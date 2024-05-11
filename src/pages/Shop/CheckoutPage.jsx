import React, { useContext, useEffect, useState } from "react";
import "../../components/modal.css"
import { UserContext } from "../../context/User";
import axios from "axios";
import { LoadingContext } from "../../context/LoadingContextProvider";
import { Modal, Button, Form } from "react-bootstrap";
import { Bounce, Slide, toast } from "react-toastify";
import { Link } from "react-router-dom";

function CheckoutPage() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [accessToken, setAccessToken] = useState("");
    const { userToken } = useContext(UserContext);
    const { withLoading, loading } = useContext(LoadingContext);

  const [order, setOrder] = useState({
    couponName: "",
    address:"",
    phone:"",

});

const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]:value
    });
  };


  async function createOrder(e) {
    e.preventDefault();
    try{
    const { data } = await axios.post(
      `${import.meta.env.VITE_API}/order`,

      {
        address:order.address,
        phone:order.phone,
       

      },
      {
        headers: {
          Authorization: `Tariq__${userToken}`,
        },
      }
    );
    
        if(data.message == "success") {
            toast.success(" Order Place successfully!", {
              position: "top-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            });
      setOrder(data.order);
    
    }
  }catch(error){
    if(error .response.status===400){
       toast.error(error.response.data.message, {
         position: "bottom-center",
         autoClose: false,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "dark",
         transition: Bounce,
         });
     }
     console.log(error)
   }
   
 }
 useEffect(() => {
    withLoading(order, "createOrder");
    createOrder();
  }, []);

 


  return (
    
    <div>
        
          <h4 className="px-3 mb-3">Add Your Information</h4>
          <div className="tab-content" id="myTabContent">
           
            <div className="mt-4 mx-4">
            <Form className="account-form" onSubmit={createOrder}>
       
              <div className="form ">

    
                <div className="inputbox" >
                
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="form-control"
                    value={order.address}
                    onChange={handleChange}
                    required
                  />
                  <span>Address</span>
                 
                </div>

                <div className="inputbox">
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="form-control"
                    value={order.phone}
                    onChange={handleChange}
                    required
                  />
                  <span>Phone number</span>
                </div>

                <div className="inputbox">
                  <input
                    type="text"
                    name="couponName"
                    id="couponName"
                    className="form-control"
                    placeholder="optional"
                    value={order.couponName}
                    onChange={handleChange}

                  />
                  <span>Coupon Code</span>
                </div>

                <div className="px-5 order">
                    <button className="btn btn-success btn-block" onClick={createOrder}>Place Order</button>
            
                </div>
                
                
              </div>
              </Form>

        
            </div>
          </div>







          
        </div>
        
     
  );
}

export default CheckoutPage;
