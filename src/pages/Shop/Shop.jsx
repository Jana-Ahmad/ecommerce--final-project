import React, { useContext, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ProductsContext } from "../../context/AllProducts";
import ProductCards from "./ProductCards";

import Search from "./Search";

function Shop() {
  const showResults = "Showing 01-08 of all Results";
  const [GridList, setGridList] = useState(true);
  const allProducts = useContext(ProductsContext);

  return (
    <div>
      <PageHeader title="Our Shop Page" currentPage="Shop" />

      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{showResults}</p>

                  <div
                    className={`products-view-more  ${
                      GridList ? "gridActive" : "listActive"
                    }`}
                  >
                    <a className="grid " onClick={() => setGridList(!GridList)}>
                      <i className="icofont-ghost me-1 "></i>
                    </a>
                    <a className="list" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>
                <div>
                  <ProductCards GridList={GridList} products={allProducts} />
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={allProducts} GridList={GridList} />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
