import express from "express";
import {
  addBooking,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
} from "../controllers/booking.js";

const router = express.Router();

router.route("/").get(getBookings);
router.route("/:id").get(getBooking);
router.route("/add").post(addBooking);
router.route("/delete/:id").delete(deleteBooking);
router.route("/update/:id").patch(updateBooking);

export default router;
