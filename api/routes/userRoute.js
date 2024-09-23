import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/userController.js";
import { verifyAdmin, verifyUser } from "../utlis/verifyToken.js";
const userRouter = express.Router();

userRouter.route("/").get(verifyAdmin, getAllUsers);
userRouter
  .route("/:id")
  .get(verifyUser, getUser)
  .patch(verifyUser, updateUser)
  .delete(verifyUser, deleteUser);
export default userRouter;
