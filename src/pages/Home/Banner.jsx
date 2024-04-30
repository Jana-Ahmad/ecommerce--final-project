import React, { useContext, useState } from "react";
import { ProductsContext } from "../../context/AllProducts";
import { Link } from "react-router-dom";
import Categories from "./Categories";


   
  const title = <h2>Search Your One From Thousand of Products</h2>;
  const desc = "We have the largest collection of products";
  const bannerList = [
    { iconName: "icofont-users-alt-4", text: "1.5 Million Customers" },
    { iconName: "icofont-notification", text: "More then 2000 Marchent" },
    { iconName: "icofont-globe", text: "Buy Anything Online" },
  ];
  const Banner= ()=>{
    const allProducts=useContext(ProductsContext);
    const products=allProducts.allProducts;
    const [searchInput,setSearchInput]=useState("");
    const [filterProducts,setFilterProducts]=useState(products);
 

 
    const HandleSearch = e=> {
        const searchTerm= e.target.value;
        setSearchInput(searchTerm)

      const filtered = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilterProducts(filtered);
      
        
    }
    

  return  <div className="banner-section style-4">
      <div className="container">
        <div className="banner-content">
            {title}
            <form>
                <input type="text" name="search" id="search" placeholder="Search your product" value={searchInput} onChange={HandleSearch}/>
                <button type="submit"><i className="icofont-search"></i></button>
            </form>
            <p>{desc}</p>
            <ul className="lab-ul">
                {
                    searchInput && products.map((products,i)=><li key={i}>
                        <Link to={`/Products/${products._id}`}>{products.name}</Link>
                    </li>)
                }

            </ul>
        </div>
      </div>
    </div>;
  
};
  


export default Banner;
