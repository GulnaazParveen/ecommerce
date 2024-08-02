import React from 'react'
import Rating from "@mui/material/Rating";
import profilePng from "../../images/Profile.png"
import { useSelector } from 'react-redux';

const ReviewCard = ({review}) => {
  
  
    const option = {
      value: review.rating,
      readOnly: true,
      precision: 0.5,
    };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...option}/>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
}

export default ReviewCard
