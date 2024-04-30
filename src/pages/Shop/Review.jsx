import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/AllProducts";
import { useParams } from "react-router-dom";
import Rating from "../Rating/Rating";

function Review() {
  const [reviewShow, setReviewShow] = useState(true);
  const allProducts = useContext(ProductsContext);
  const products = allProducts.allProducts;
  const [product, setProduct] = useState([]);
  console.log(products.reviews)
  const { id } = useParams();

  useEffect(() => {
    fetch("products").then((allProducts) => setProduct(allProducts));
  }, []);
  const result = products.filter((product) => product.id === id);
 
  console.log(result)
  return (
    <>
      <ul
        className={`review-nav lab-ul${
          reviewShow ? "RevActive" : "DescActive"
        }`}
      >
        <li className="desc" onClick={() => setReviewShow(!reviewShow)}>
          Description
        </li>
        <li className="rev" onClick={() => setReviewShow(!reviewShow)}>
          Reviews
        </li>
      </ul>

      <div
        className={`review-content ${
          reviewShow ? "review-content-show" : "description-show"
        }`}
      >
        <div className="review-showing">
          <ul className="content lab-ul">
            {result.map((item, i) => (
              <li key={i}>

                <div className="post-content">
                  <div className="entry-meta">
                    <div className="posted-on">
                      <a href="#">{item.reviews.name}</a>
                     
                      <p>{item.reviews.createdAt}</p>
                    </div>
                  </div>
                  <div className="entry-content">
                    <p>{item.reviews.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="client-review">
            <div className="review-form">
                <div className="review-title">
<h5>Add a Review</h5>
                </div>
                <form action="action" className="row">
                    <div className="col md-4 col-12">
<input type="text" name="name" id="name" placeholder="Full Name*" required/>
                    </div>
                    <div className="col md-4 col-12">
<input type="email" name="email" id="name" placeholder="Your Email*" />
                    </div>
                    <div className="col md-4 col-12">
<div className="rating">
    <span className="me-2 ">Your Rating</span>
    <Rating/>
    </div>
                    </div>
                    <div className="col md-12 col-12 mt-4">
<textarea name="message" id="message" rows="6" placeholder="Type Here Message"></textarea>
                    </div>
                    <div className="col-12">
<button type="submit" className="default-button">
    <span>Submit Review</span>
</button>
                    </div>
                </form>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
