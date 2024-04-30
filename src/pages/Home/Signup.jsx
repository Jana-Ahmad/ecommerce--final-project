import { useState } from "react";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, Slide, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom";


function Signup() {
  const subTilte="Save the Day";
  const title=(
    <h2 className="title">Join on Day Long Free Workshop for <b>Advance<span>Mastering</span></b>on Sales</h2>
  )
  const desc="Limited Time Offer! Hurry Up";

  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors, setErrors] = useState([]);
  const[loader,setLoader]=useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const validateData = async () => {
    const registerSchema = object({
      userName: string().required(),
      email: string().email().required(),
      password: string().min(8).max(20).required(),
      image: string().required(),
    });

    try {
      await registerSchema.validate(user, { abortEarly: false });
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
    if (await validateData()) {
      let formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("image", user.image);

      try{
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/auth/signup`,
        formData
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
}

  return (
    <>
     
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}
      <div className="register-section padding-tb pb-0 mb-5">
        
<div className="container">
  <div className="row g-4 row-cols-lg-2 row-cols-1 align-items-center">
    <div className="col">
<div className="section-header">
<span className="subtitle">{subTilte}</span>
{title}
<p>{desc}</p>
</div>
    </div>
    <div className="col">
      <div className="section-wrapper">
        <h4>Register Now</h4>
        <form className="register-form" onSubmit={handleSubmit}>
     
        <input className="reg-input"
          type="text"
          value={user.userName}
          name="userName"
          onChange={handleChange}
          placeholder="Username"
        />

       
        <input className="reg-input"
          type="text"
          value={user.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />

       
        <input className="reg-input"
          type="text"
          value={user.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />

        
        <input className="reg-input" type="file" name="image" onChange={handleImageChange} placeholder="Image"/>

        <button type="submit" className="lab-btn" disabled={loader? 'disabled' : null}>{!loader?'Register Now': "wait..."}</button>
      </form>
      </div>
    </div>

  </div>

</div>
      </div>
     
    </>
  );
}

export default Signup;
