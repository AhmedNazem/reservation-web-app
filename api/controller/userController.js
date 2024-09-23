import { User } from "../models/userModel.js";
import { appError } from "../utlis/appError.js";

// Create a User

// Get a User by ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(appError(404, "This User does not exist :("));
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(appError(500, "Error fetching the User"));
  }
};

// Get all Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0) {
      return next(appError(404, "There are no Users in the database"));
    }

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(appError(500, "Error fetching Users"));
  }
};

// Update a User
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(appError(404, "No User found with that ID"));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(appError(400, "Failed to update the User"));
  }
};

// Delete a User
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return next(appError(404, "No User found with that ID 😞"));
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully 🗑️",
      data: {},
    });
  } catch (err) {
    next(appError(500, "Failed to delete the User"));
  }
};
