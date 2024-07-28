import express  from "express";
const OrderRouter=express.Router()
 import isAuthenticatedUser, { authorizeRoles } from "../middleware/auth.js";
import OrderDetails from "../controllers/OrderController.js";

OrderRouter.route("/order/new").post(isAuthenticatedUser, OrderDetails.newOrder)
OrderRouter.route("/order/:id").get(isAuthenticatedUser,OrderDetails.getSingleOrder)
OrderRouter.route("/orders/me").get(isAuthenticatedUser,OrderDetails.myOrders)
OrderRouter.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),OrderDetails.getAllOrders)
OrderRouter.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),OrderDetails.updateOrder).delete(isAuthenticatedUser,authorizeRoles("admin"),OrderDetails.deleteOrder
)
export default OrderRouter