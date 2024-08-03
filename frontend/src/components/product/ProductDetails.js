import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Rating from "@mui/material/Rating";
import "./productDetail.css";
import ReviewCard from "../home/ReviewCard";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]); // Ensure dependencies are accurate
  const option = {
    size: "large",
    value: product?.ratings || 0,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <div className="ProductDetails">
        <div>
          <div className="carousel-container">
            <Carousel
              indicators={true} // Ensure indicators are shown
              indicatorContainerProps={{
                style: { position: "absolute", bottom: 10 },
              }} // Position dots at bottom
              indicatorProps={{
                style: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Dot color
                  width: 8, // Dot size
                  height: 8, // Dot size
                  margin: "0 2px", // Space between dots
                },
              }}
            >
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>
        </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <Rating {...option} />
            <span className="detailsBlock-2-span">
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={""}>-</button>
                <input readOnly type="number" value={""} />
                <button onClick={""}>+</button>
              </div>
              <button disabled={product.Stock < 1} onClick={""}>
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>

          <button onClick={""} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>
      {product.reviews && product.reviews.length > 0 ? (
        <div className="reviews">
          {product.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </>
  );
};

export default ProductDetails;
