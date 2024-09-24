import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controller/roomsController.js";
import { verifyAdmin } from "../utlis/verifyToken.js";
const roomsRouter = express.Router();
roomsRouter.route("/").get(verifyAdmin, getAllRooms);
roomsRouter
  .route("/:id")
  .post(verifyAdmin, createRoom)
  .get(getRoom)
  .patch(verifyAdmin, updateRoom)
  .delete(verifyAdmin, deleteRoom);
export default roomsRouter;
