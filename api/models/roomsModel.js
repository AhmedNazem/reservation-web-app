import mongoose from "mongoose";
const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "room must have a title"],
    },
    price: {
      type: Number,
      required: [true, "Room must have a price"],
      min: [0, "Price must be a positive number"],
    },

    maxPeople: {
      type: Number,
      required: [true, "Room must set a max amount of people"],
      min: [1, "There must be at least 1 person"],
    },

    desc: {
      type: String,
      required: [true, "room must have a description"],
    },
    roomNumbers: [
      {
        number: {
          type: Number,
          required: true,
          min: [0, "Room number cannot be negative"],
        },
        unavailableDates: {
          type: [Date],
          default: [],
        },
      },
    ],
  },
  { timestamps: true }
);
export const Room = mongoose.model("Room", roomSchema);
