// import mongoose from "mongoose";
// import validator from "validator";
// import bcrypt from "bcryptjs"; // Import bcryptjs
// import JWT from "jsonwebtoken";
// import crypto from "crypto"; // Correct import
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "please enter your name"],
//     maxLength: [30, "name cannot exceed 30 characters"],
//     minLength: [4, "name should have more than 4 characters"],
//   },
//   email: {
//     type: String,
//     required: [true, "please Enter your email"],
//     unique: true,
//     validate: [validator.isEmail, "please enter a valid email"],
//   },
//   password: {
//     type: String,
//     required: [true, "please Enter your password"],
//     minLength: [8, "password should be greater than 8 characters"],
//     select: false, // Do not return password field by default when querying users
//     //   select false because when find any user than get all data from matched document except password
//   },
//   avatar: {
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//   role: {
//     type: String,
//     default: "user",
//   },
//   resetPasswordToken: String,
//   resetPasswordExpire: Date,
// });

// userSchema.pre("save",async function(next){
//     if(!this.isModified("password")){
//         next()
//     }
//    this.password=await bcrypt.hash(this.password,10);
// })

// // register karte hi apne aap login v ho jata hai 
// // JWT TOKEN
// userSchema.methods.getJWTToken=function(){
//     return JWT.sign({id:this._id},process.env.JWT_SECRET,{
//         expiresIn:process.env.JWT_EXPIRE
//     })
// }

// // compare password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };


// // Generating Password Reset Token
// // userSchema.methods.getResetPasswordToken = function () {
// //   // Generating Token
// //   const resetToken = crypto.randomBytes(20).toString("hex");

// //   // Hashing and adding resetPasswordToken to userSchema
// //   this.resetPasswordToken = crypto
// //     .createHash("sha256")
// //     .update(resetToken)
// //     .digest("hex");

// //   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

// //   return resetToken;
// // };

// const User = mongoose.model("User", userSchema);
// export default User;

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"; // Import bcryptjs
import JWT from "jsonwebtoken";
import crypto from "crypto"; // Correct import

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false, // Do not return password field by default when querying users
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating Password Reset Token
// userSchema.methods.getResetPasswordToken = function () {
//   // Generating Token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hashing and adding resetPasswordToken to userSchema
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//   return resetToken;
// };

const User = mongoose.model("User", userSchema);
export default User;
