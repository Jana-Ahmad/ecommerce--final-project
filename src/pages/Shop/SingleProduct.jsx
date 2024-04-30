import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../context/AllProducts";
import PageHeader from "../../components/PageHeader/PageHeader";

import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ProductDisplay from "./ProductDisplay";
import Review from "./Review";
import axios from "axios";
import { LoadingContext } from "../../context/LoadingContextProvider";

function SingleProduct() {
  const allProducts = useContext(ProductsContext);
  const products = allProducts.allProducts;
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  const [singleProduct, setSingleProduct] = useState({});
  const { withLoading, loading } = useContext(LoadingContext);

  async function getSingleProduct() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products/${id}`
      );
      if (data.message == "success") {
        setSingleProduct(data.product);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    withLoading(getSingleProduct, "getSingleProduct");
  }, [id]);

  useEffect(() => {
    fetch("products").then((allProducts) => setProduct(allProducts));
  }, []);
  const result = products.filter((product) => product.id === id);

  const images =
    Object.keys(singleProduct).length > 0
      ? [singleProduct?.mainImage, ...singleProduct.subImages]
      : [];

  if (loading.getSingleProduct) {
    return (
      <h1 style={{ martingTop: "100px", background: "red" }}>Loading....</h1>
    );
  }

  return (
    <div>
      <PageHeader
        title={"OUR SHOP SINGLE"}
        currentPage={"Shop / Single Product"}
      />
      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            className="mySwiper"
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={"true"}
                            autoplay={{
                              delay: 2000,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Navigation, Pagination]}
                            navigation={{
                              prevEl: ".pro-single-prev",
                              nextEl: ".pro-single-next",
                            }}
                            pagination
                          >
                            {images.map((image) => (
                              <SwiperSlide key={image.public_id}>
                                <div className="single-thumb">
                                  <img
                                    src={image.secure_url}
                                    alt="product image"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <div className="pro-single-prev">
                            <i className="icofont-rounded-right"></i>
                          </div>
                          <div className="pro-single-next">
                            <i className="icofont-rounded-left"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        <div>
                          
                            <ProductDisplay item={singleProduct} />
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review">
                  <Review />
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
