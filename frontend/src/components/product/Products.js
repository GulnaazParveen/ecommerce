import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import ProductCard from "../home/ProductCard.js";
import Pagination from "react-js-pagination";
import "./products.css";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import MetaData from "../layout/MetaData.js";


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];
const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category,setCategory]=useState("")
  const [ratings,setRatings]=useState(0)

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct({ keyword, currentPage,price,category,ratings
    }));
  }, [dispatch, keyword, currentPage,price,category,ratings]);

   const priceHandler = (event, newPrice) => {
     setPrice(newPrice);
   };

   let count = filteredProductsCount;
  return (
    <>
      <MetaData title="PRODUCTS -- ECOMMERCE" />
      <h2 className="productsHeading">Products</h2>

      <div className="products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />

        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        </fieldset>
      </div>
      <div className="paginationBox">
        {resultPerPage < count && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
      </div>
    </>
  );
};

export default Products;
