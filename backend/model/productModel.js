import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Product Name"]
  },
  description: { // Changed to camelCase
    type: String,
    required: [true, "Please enter Product Description"]
  },
  price: {
    type: Number,
    required: [true, "Please enter Product Price"] // Corrected case
  },
  rating: {
    type: Number,
    default: 0
  },
  // iamges is array of object becasue multiple image can be one product
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, "Please enter Product Category"]
  },
  stock: {
    type: Number,
    required: [true, "Please enter Product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },
  createdAt: { // Changed to camelCase and corrected spelling
    type: Date,
    default: Date.now
  },
   resetPasswordToken: String,
  resetPasswordExpire: Date,
});
 
// Create a text index on the 'name' and 'description' fields
productSchema.index({ name: "text", description: "text" });



const Product = mongoose.model("Product", productSchema); // Corrected to lowercase "model"

export default Product;
