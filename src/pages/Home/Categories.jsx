import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContextProvider";
import { asyncHandler } from "../../components/utils/asyncHandler";

function Categories() {
  const subTitle = "Choose Any Products";
  const title = "Buy Everything with us";
  const btnText = "Get Started Now";
  const [categories, setCategories] = useState([]);
  const {loading , withLoading}= useContext(LoadingContext)
  

    const getCategories = asyncHandler(async()=>{
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/categories/active?limit=10`
      );
      setCategories(data.categories);
    })
    
  
  useEffect(() => {
    withLoading(()=>getCategories(),"getMyCategories")
  }, []);
  if (loading.getMyCategories) {
    return <Loader/>;
  } 


  return (
    <div className="category-section style-4 padding-tb mt-5">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>
       <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-m-4 row-cols-sm-3 row-cols-2">
            {categories.map((category) => (
              <div className="col text-center"  key={category._id}>
                <Link className="category-item" to={`/categories/${category._id}`}>
                  <div className="category-inner">
                    <div className="category-thumb">
                      <img className="rounded" src={category.image.secure_url} />
                    </div>
                  
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-5">
<Link to="/categories" className="lab-btn">
<span>{btnText}</span>
</Link>
        </div>
      </div>
    </div>
  );
 
}

export default Categories;
