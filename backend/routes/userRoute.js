import express from 'express';
import userAuthentication from '../controllers/userController.js';
import isAuthenticatedUser, { authorizeRoles } from "../middleware/auth.js";
const router = express.Router();

router.post('/register', userAuthentication.registerUser);
router.post("/login",userAuthentication.loginUser)
router.get("/logout",userAuthentication.logout)
router.route("/me").get(isAuthenticatedUser,userAuthentication.getUserDetails)

router.route("/password/update").put(isAuthenticatedUser, userAuthentication.updatePassword )
router.route("/me/update").put(isAuthenticatedUser, userAuthentication.updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), userAuthentication.getAllUserMeanAdmin);

router
  .route("/admin/user/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userAuthentication.getSingleUserAdmin
  ).put(isAuthenticatedUser, authorizeRoles("admin"), userAuthentication.updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), userAuthentication.deleteUser);

export default router;
