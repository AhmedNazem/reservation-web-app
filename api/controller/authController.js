import { User } from "../models/userModel.js";
import { appError } from "../utlis/appError.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm, // This will be validated but not saved
    });

    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(appError("please enter both email and  password "));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        appError(401, "incorrect password or email inter the right inputs ")
      );
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    user.password = undefined;
    user.isAdmin = undefined;
    res
      .cookie("jwt_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: "success",
        data: {
          user,
        },
      });
  } catch (err) {
    next(err);
  }
};
