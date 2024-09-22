import { Hotel } from "../models/hotelModel.js";
import { appError } from "../utlis/appError.js";

// Create a hotel
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
    next(appError(400, "Failed to create a  hotel"));
  }
};

// Get a hotel by ID
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return next(appError(404, "This hotel does not exist :("));
    }

    res.status(200).json({
      status: "success",
      data: hotel,
    });
  } catch (err) {
    next(appError(500, "Error fetching the hotel"));
  }
};

// Get all hotels
export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    if (!hotels || hotels.length === 0) {
      return next(appError(404, "There are no hotels in the database"));
    }

    res.status(200).json({
      status: "success",
      data: {
        hotels,
      },
    });
  } catch (err) {
    next(appError(500, "Error fetching hotels"));
  }
};

// Update a hotel
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
    if (!hotel) {
      return next(appError(404, "No hotel found with that ID"));
    }

    res.status(200).json({
      status: "success",
      data: {
        hotel,
      },
    });
  } catch (err) {
    next(appError(400, "Failed to update the hotel"));
  }
};

// Delete a hotel
export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOneAndDelete({ _id: req.params.id });
    if (!hotel) {
      return next(appError(404, "No hotel found with that ID 😞"));
    }

    res.status(200).json({
      status: "success",
      message: "Hotel deleted successfully 🗑️",
      data: {},
    });
  } catch (err) {
    next(appError(500, "Failed to delete the hotel"));
  }
};
