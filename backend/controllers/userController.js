import ErrorHandler from "../utils/errorhandler.js";
import User from "../model/userModels.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import cloudinary from "cloudinary";
class userAuthentication {
  static registerUser = async (req, res, next) => {
    try {
      const { name, email, password,role } = req.body;

      const user = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: "this is sample id",
          url: "profilepic",
        },
        role
      });

      sendToken(user, 201, res);
    } catch (error) {
      next(error); // Passes the error to the error handling middleware
    }
  };

  // login user
  static loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email & password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
  };

  // logout

  static logout = async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      messsage: "logged out",
    });
  };

  //  get  user details

  static getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  };
  // update User password
  static updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  };

  // update User Profile
  static updateProfile = async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    // if (req.body.avatar !== "") {
    //   const user = await User.findById(req.user.id);

    //   const imageId = user.avatar.public_id;

    //   await cloudinary.v2.uploader.destroy(imageId);

    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   });

    //   newUserData.avatar = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   };
    // }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  };

  // Get all users(admin)
  static getAllUserMeanAdmin = async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  };

  // Get single user (admin)
  static getSingleUserAdmin = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  };

  // update User Role -- Admin
  static updateUserRole = async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  };

  // Delete User --Admin
  static deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
    await user.remove();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  };
}

export default userAuthentication;
