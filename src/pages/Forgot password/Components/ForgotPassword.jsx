import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/User';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const title="Forgot Password";
  const btnText="Reset Now!"
  const {setUserToken}=useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
  });
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const[loader,setLoader]=useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const response= await axios.patch(
          `${import.meta.env.VITE_API}//auth/sendcode`,
          {
            email:user.email,
            password:user.psaaword,
      
          }
        );
    
        setMessage(response.data.message);
      } catch (error) {
        
        setMessage(`Instructions to reset password have been sent to ${email}`);
      }
      finally{
        setLoader(false);
        }
    };
  
    


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
            
          />
 </div>
 <div className="form-group">
          <input 
            type="text"
            placeholder="Enter the code"
            required
            name="code"
            id="code"
            
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
