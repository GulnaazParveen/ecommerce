//  import User from "../model/userModels.js";
//  import jwt from "jsonwebtoken";
// import ErrorHandler from "../utils/errorhandler.js";
// const isAuthenticatedUser = async (req, res, next) => { 
//   const { token } = req.cookies;

//   if (!token) {
//     return next(new ErrorHandler("Please Login to access this resource", 401));
//   }

//   const decodedData = jwt.verify(token, process.env.JWT_SECRET);

//   req.user = await User.findById(decodedData.id);

//   next();
// };
// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHandler(
//           `Role: ${req.user.role} is not allowed to access this resouce `,
//           403
//         )
//       );
//     }

//     next();
//   };
// };
// export default isAuthenticatedUser

import User from "../model/userModels.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorhandler.js";

const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // admin 
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource `,
          403
        )
      );
    }

    next();
  };
};

export { authorizeRoles };
export default isAuthenticatedUser;
