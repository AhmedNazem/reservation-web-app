import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controller/hotelController.js";
import { verifyAdmin } from "../utlis/verifyToken.js";

const hotelRouter = express.Router();
hotelRouter.route("/").post(verifyAdmin, createHotel).get(getAllHotels);
hotelRouter
  .route("/:id")
  .get(getHotel)
  .patch(verifyAdmin, updateHotel)
  .delete(verifyAdmin, deleteHotel);
export default hotelRouter;
