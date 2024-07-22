import Product from "../model/productModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import ApiFeatures from "../utils/apiFeatures.js";
class productController {
  // create product 
  static createProduct = async (req, res, next) => {
    try {
      req.body.user=req.user.id
      const product = await Product.create(req.body);
      res.status(201).json({
        success: true,
        product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // get All Products
  static getAllProducts = async (req, res) => {
    //   ApiFeatures(query, req.query.keyword)
   const resultPerPage = 2;
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
    resultPerPage,
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
      return next( new ErrorHandler("product not found",404))
    }

    // Update the product with the data from req.body
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // Return the updated document
      runValidators: true, // Run schema validators
      useFindAndModify: false // Ensure use of native `findOneAndUpdate()`
    });

    // Respond with the updated product
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    // Catch any errors and respond with a 500 status code
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// delete product

static deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check if the product exists
    if (!product) {
      return  next( new ErrorHandler("product not found",404))
    }

    // Delete the product
    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    // Catch any errors and respond with a 500 status code
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


}

export default productController;
