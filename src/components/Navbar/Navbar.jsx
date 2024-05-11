import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User";
import { useState } from "react";
import logo from "../../assets/images/logo/logo.png";


function Navbar() {
  const { userName, setUserToken, setUserName } = useContext(UserContext);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserName(null);

    //add Event Listener

    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    });
    navigate("/signin");
  };
  
  return (
  
    <header
      className={`header-section style-4 ${
        headerFixed ? "header-fixed fadeInUp" : ""
      }`}
    >
      {/*header top start */}
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <NavLink className="nav-link lab-btn me-3" to="/signup">
              Create Account
            </NavLink>
            <NavLink className="nav-link" to="/signin">
              Log in
            </NavLink>
          </div>
        </div>
      </div>

      {/*header bottom */}
      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            {/*logo */}
            <div className="logo-cearch-acte">
              <div className="logo">
                <NavLink to={"/"}>
                  <img src={logo}></img>
                </NavLink>
              </div>
            </div>
            {/*menu area */}
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop">Shop</NavLink>
                  </li>
                  
                  <li>
                    <NavLink to="/cart">Cart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile">Orders</NavLink>
                  </li>
                </ul>
              </div>
              {/*Signup & Log in */}
              
              <Link to="/signup" className="lab-btn me-3 d-none d-md-block">
                Create Account
              </Link>
              <Link to="/signin" className=" d-none d-md-block">
                Log In
              </Link>
              {/* menu toggler*/}
              <div onClick={()=>setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/* social toggler*/}
              <div className="ellepsis-bar d-md-none"
              onClick={()=> setSocialToggle(!socialToggle)}>
              <i className="icofont-info-square"></i>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

