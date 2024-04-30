 import { useContext, useState } from "react";
  import axios from "axios";
  import { object, string } from "yup";
  import { Bounce, Slide, toast } from "react-toastify";
  import "bootstrap/dist/css/bootstrap.min.css"
  import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";
  
  
  function Signin() {
    const title="Login";
    const btnText="Login Now"
    const {setUserToken}=useContext(UserContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({
      email: "",
      password: "",
  
    });
  
    const [errors, setErrors] = useState([]);
    const[loader,setLoader]=useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({
        ...user,
        [name]:value
      });
    };
    
    const validateData = async () => {
      const loginSchema = object({
        email: string().email().required(),
        password: string().min(8).max(20).required(),
        
      });
  
      try {
        await loginSchema.validate(user, { abortEarly: false });
        return true;
      } catch (error) {
        setErrors(error.errors);
        setLoader(false)
        return false;
      }
     
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoader(true)
    
  
        try{
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signin`,
          {
            email:user.email,
            password:user.password
          }
        );
        
  
        if(data.message == "success") {
          toast.success(" Login successfully!", {
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
          localStorage.setItem('userToken',data.token);
          setUserToken(data.token);
          navigate ("/");
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
      <>
       
<div>
  <div className="login-section padding-tb section-bg">
    <div className="container">
      <div className="account-wrapper">
        <h3 className="title">{title}</h3>
        <form className="account-form" onSubmit={handleSubmit}>
          <div className="form-group">
          <input 
            type="email"
            placeholder="Email Address *"
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
            placeholder="Enter Your Password *"
            required
            value={user.password}
            name="password"
            id="password"
            onChange={handleChange}
          />
         </div>
    <div>
       
    {errors.length > 0 ? errors.map((error) => <div className="error-message text-danger">{error}</div>): ""}
    </div>
    <div className="form-group">
      <div className="d-flex justify-content-between flex-wrap pt-sm-2">
        <div className="checkgroup">
<input type="checkbox" name="remember" id="remember"/>
<label htmlFor="remember">Remember me</label>
        </div>
       Forgotton password? <Link to="/sendcode">Reset it</Link>
      </div>
    </div>
          
  <div className="form-group">
  <button className="d-block lab-btn" type="submit" disabled={loader? 'disabled' : null}>{!loader?'Login Now': "wait..."}</button>
  </div>
  
        </form>

        <div className="account-bottom">
          <span className="d-block cate pt-10">
            Dont Have an Account? <Link to="/signup">Register</Link>
          </span>
        </div>
      </div>
    </div>
  </div>
       
          
        
        </div>
      </>
    );
    }
  
export default Signin