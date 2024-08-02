import Product from "../model/productModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import ApiFeatures from "../utils/apiFeatures.js";
class productController {
  // create product
  static createProduct = async (req, res, next) => {
    try {
      req.body.user = req.user.id;
      const product = await Product.create(req.body);
      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // get All Products
  static getAllProducts = async (req, res) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage, // Ensure this is being returned
      filteredProductsCount: products.length,
    });
  };

  // update product --Admin
  static updateProduct = async (req, res, next) => {
    try {
      // Find the product by ID
      let product = await Product.findById(req.params.id); // Added 'await' to make it asynchronous

      // Check if the product exists
      if (!product) {
        return next(new ErrorHandler("product not found", 404));
      }

      // Update the product with the data from req.body
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
        useFindAndModify: false, // Ensure use of native `findOneAndUpdate()`
      });

      // Respond with the updated product
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      // Catch any errors and respond with a 500 status code
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // delete product

  static deleteProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      // Check if the product exists
      if (!product) {
        return next(new ErrorHandler("product not found", 404));
      }

      // Delete the product
      await Product.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      // Catch any errors and respond with a 500 status code
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // Create New Review or Update the review
    exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
      const { rating, comment, productId } = req.body;

      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };

      const product = await Product.findById(productId);

      const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
        });
      } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
      });
    });
  };

  static createProductReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  };
  static getProductReviews = async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  };

  // Delete Review
  static deleteReview = async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  };
}

export default productController;
