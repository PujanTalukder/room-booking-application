// modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roomRouter from "./routes/room.js";
import bookingRouter from "./routes/booking.js";

// configure environment variable
dotenv.config();

// setting up dynamic port
const port = process.env.PORT || 5000;

// app config
const app = express();

// express middleware
/* middleware to configure cors*/
app.use(cors());
/* middleware to parse json data*/
app.use(express.json());

// database config
const connection_uri = process.env.ATLAS_URI;

mongoose.connect(connection_uri || "mongodb://localhost/app_db", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection
  .once("open", () => {
    console.log("database connected successfully");
  })
  .on("error", (err) => {
    console.log({ message: err.message || "error connecting to database" });
  });

// api routes
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// listen
app.listen(port, () => console.log(`server is running on port : ${port}`));
