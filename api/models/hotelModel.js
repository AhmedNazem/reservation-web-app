import mongoose from "mongoose";
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "the hotel must have a name "],
  },
  type: {
    type: String,
    required: [true, "hotel must have a type "],
  },
  city: {
    type: String,
    required: [true, "hotel must have the city for it"],
  },
  address: {
    type: String,
    required: [true, "hotel must have an address"],
  },
  distance: {
    type: String,
    required: [true, "hotel must have a distance"],
  },
  photos: {
    type: [String],
  },
  desc: {
    type: String,
    required: [true, "hotel must have a description "],
  },
  title: {
    type: String,
    required: [true, "hotel must have a title "],
  },
  rating: {
    type: Number,
    min: [0, "the minimum value for rating is 0"],
    max: [5, "the maximum value for rating is 5"],
    default: 4.5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: [true, "hotel must have cheapest price room"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export const Hotel = mongoose.model("hotel", hotelSchema);
