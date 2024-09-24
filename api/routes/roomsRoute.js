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

roomsRouter.route("/:id").get(getRoom).patch(verifyAdmin, updateRoom);

roomsRouter.route("/:hotelId").post(verifyAdmin, createRoom);
roomsRouter.route("/:roomId/:hotelId").delete(verifyAdmin, deleteRoom);

export default roomsRouter;
