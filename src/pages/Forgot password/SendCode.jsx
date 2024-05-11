import React, { useContext, useState } from 'react';
import axios from 'axios';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LoadingContext } from '../../context/LoadingContextProvider';
import { UserContext } from '../../context/User';
import { Bounce, Slide, toast } from 'react-toastify';



function SendCode() {
  const title="Reset Your Account";
  const navigate = useNavigate();
  const btnText="Reset Now!"
  const[loader,setLoader]=useState(false);
  

 

    const [code, setCode] = useState({
      email: "",
    });
    

  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCode({
        [name]:value
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoader(true)

      try {
        const {data} = await axios.patch(
          `${import.meta.env.VITE_API}/auth/sendcode`,
          { 
            email:code.email,
           }
        );
       
     
      if(data.message == "success") {
        toast.success(" Code Sended successfully!", {
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
        
        navigate ("/forgotPassword");
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
    finally{
      setLoader(false);
      }
  
  }
    
  
  
  return (

    <div>
  <div className="forgetpass-section padding-tb section-bg">
    <div className="container">
      <div className="account-wrapper">
        <h3 className="title">{title}</h3>
        <form className="account-form" onSubmit={handleSubmit}>
          <div className="form-group">
          <input 
           type="email"
           placeholder="Email Address *"
           required
           value={code.email}
           name="email"
           id="email"
           onChange={handleChange}
          />
 </div>
 <div className="form-group">
  <Link to="/forgotpassword"><button type="submit" disabled={loader? 'disabled' : null}>{!loader?'Send Code': "wait..."}</button></Link>
  </div>
     
      </form>
  
      </div>
      </div>
      </div>
      </div>
  )
   
}

export default SendCode
