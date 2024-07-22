// import express from "express";
// const router = express.Router();
// import productController from "../controllers/productController.js";

// // defining routes
// router.get("/products", productController.getAllProducts);
// router.post('/products/new', productController.createProduct);
// router.put("/products/:id", productController.updateProduct);
// router.delete("/products/:id", productController.deleteProduct); // Changed to DELETE method

// export default router;

import express from "express";
import productController from "../controllers/productController.js";
import isAuthenticatedUser, { authorizeRoles } from "../middleware/auth.js";
const productRouter=express.Router()
// Define routes
productRouter.route("/products")
  .get(productController.getAllProducts);

productRouter.route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), productController.createProduct);

productRouter.route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), productController.updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), productController.deleteProduct);

  
export default productRouter;
