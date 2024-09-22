import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controller/hotelController.js";

const hotelRouter = express.Router();
hotelRouter.route("/").post(createHotel).get(getAllHotels);
hotelRouter.route("/:id").get(getHotel).patch(updateHotel).delete(deleteHotel);
export default hotelRouter;
