import { Room } from "../models/roomsModel.js";
import { appError } from "../utlis/appError.js";
import { Hotel } from "../models/hotelModel.js";

// Create a Room
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.id;
  const { title, price, maxPeople, desc, roomNumbers } = req.body;

  try {
    const newRoom = await Room.create({
      title,
      price,
      maxPeople,
      desc,
      roomNumbers,
    });
    const hotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $push: { rooms: newRoom._id } },
      { new: true }
    );

    if (!hotel) return next(appError(404, "Hotel not found!"));

    res.status(201).json({ status: "success", data: { newRoom } });
  } catch (err) {
    next(appError(500, `Failed to create room: ${err.message}`));
  }
};

// Get a Room by ID
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return next(appError(404, "Room not found!"));

    res.status(200).json({ status: "success", data: { room } });
  } catch (err) {
    next(appError(500, "Error fetching the room"));
  }
};

// Get All Rooms
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (!rooms.length) return next(appError(404, "No rooms found!"));

    res.status(200).json({ status: "success", data: { rooms } });
  } catch (err) {
    next(appError(500, "Error fetching rooms"));
  }
};

// Update a Room
export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) return next(appError(404, "Room not found!"));

    res.status(200).json({ status: "success", data: { room } });
  } catch (err) {
    next(appError(400, `Failed to update room: ${err.message}`));
  }
};

// Delete a Room
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return next(appError(404, "Room not found!"));

    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });

    res
      .status(200)
      .json({
        status: "success",
        message: "Room deleted successfully",
        data: {},
      });
  } catch (err) {
    next(appError(500, `Failed to delete room: ${err.message}`));
  }
};
