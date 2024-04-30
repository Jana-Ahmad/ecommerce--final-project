import React, { useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';



function SendCode() {
  const title="Reset Your Account";
  const btnText="Reset Now!"
 

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        // Send a request to the backend to send a verification code to the user's email
        const response = await axios.patch(
          `${import.meta.env.VITE_API}/auth/sendcode`,
          { email }
        );
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error sending verification code:', error);
        setMessage('An error occurred while sending the verification code. Please try again.');
      }
  
      setLoading(false);
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
            value={email}
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
 </div>
 <div className="form-group">
  <Link to="/forgotpassword"><button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Verification Code'}</button></Link>
  </div>
     
      </form>
      {message && <p>{message}</p>}
      </div>
      </div>
      </div>
      </div>
  )
   
};

export default SendCode
