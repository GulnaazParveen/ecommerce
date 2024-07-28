import React, { Fragment } from "react";
import "./home.css";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";

const Home = () => {
  const product = {
    name: "Blue Tshirt",
    images: [
      {
        url: "https://images.meesho.com/images/products/412063047/ne2qv_512.webp",
      },
    ],
    price: 3000, // Moved price here
    _id: "abhishek", // Moved _id here
    ratings: 4.5, // Added ratings
    numOfReviews: 10, // Added numOfReviews
  };

  return (
    <Fragment>
      <MetaData title={"HOME PAGE IS WORKING"} />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
