import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/User';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, Slide, toast } from 'react-toastify';

const ForgotPassword = () => {
  const title="Forgot Password";
  const btnText="Reset Now!"
  const {setUserToken}=useContext(UserContext);
  const navigate = useNavigate();
 
 
  const [user, setUser] = useState({
    "email":" ",
    "password":" ",
    "code":" "

});
  const[loader,setLoader]=useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const data= await axios.patch(
          `${import.meta.env.VITE_API}/auth/forgotPassword`,
          {
            email:user.email,
            password:user.psaaword,
            code:user.code
      
          }
        );
        if (data.message == "success") {
          toast.success(" Your account has been created successfully!", {
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
          navigate ("/signin");
        }
      }catch(error){
        if(error .response.status===409){
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
            placeholder="Enter you email Address *"
            required
            value={user.email}
            name="email"
            id="email"
            onChange={handleChange}
            
          />
 </div>
 <div className="form-group">
          <input 
            type="password"
            placeholder="Enter a new Password *"
            required
            value={user.password}
            name="password"
            id="password"
            onChange={handleChange}
            
          />
 </div>
 <div className="form-group">
          <input 
            type="text"
            placeholder="Enter the code"
            required
            name="code"
            id="code"
            value={user.code}
            onChange={handleChange}
            
          />
 </div>
 <div className="form-group">
  <Link to="/signin"><button className="d-block lab-btn" type="submit" disabled={loader? 'disabled' : null}>{!loader?'Reset Account': "wait..."}</button></Link>
  </div>
     
      </form>
      </div>
      </div>
      </div>
      </div>
  )
   
};

export default ForgotPassword
