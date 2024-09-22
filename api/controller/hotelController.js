import { Hotel } from "../models/hotelModel.js";

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = await Hotel.create({
      name: req.body.name,
      type: req.body.type,
      city: req.body.city,
      address: req.body.address,
      distance: req.body.distance,
      title: req.body.title,
      desc: req.body.desc,
      cheapestPrice: req.body.cheapestPrice,
    });

    res.status(201).json({
      status: "success",
      data: {
        newHotel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `💔 ${err.message}`,
    });
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      throw new Error("this hotel is not exists :(");
    }

    res.status(200).json({
      status: "success",
      data: hotel,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: `error due to ${err.message}`,
    });
  }
};
export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    if (!hotels) throw new Error("there are no hotels in the DB");
    res.status(200).json({
      status: "success",
      data: {
        hotels,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: `fail due to ${err.message}`,
    });
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        hotel,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: `can't find the hotel ${err.message}`,
    });
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOneAndDelete({ _id: req.params.id });
    if (!hotel) {
      return res.status(404).json({
        status: "fail",
        message: "No hotel found with that ID 😞",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Hotel deleted successfully 🗑️",
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: `Failed to delete hotel: ${err.message} 💔`,
    });
  }
};
