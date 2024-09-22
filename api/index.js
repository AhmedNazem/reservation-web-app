import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import hotelRouter from "./routes/hotelRoute.js";
import roomsRouter from "./routes/roomsRoute.js";
import userRouter from "./routes/userRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("successfully connected to the DataBase 🟢");
  } catch (err) {
    console.log("connection fail  due to 🔴", err);
  }
};
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/users", userRouter);
app.listen(port, () => {
  console.log(`server running on port ${port} 🚀`);
  connectionDB();
});
