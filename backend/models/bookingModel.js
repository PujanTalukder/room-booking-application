// module
import mongoose from "mongoose";

// defining schema
const bookingSchema = mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    check_in: {
      type: String,
      required: true,
    },
    check_out: {
      type: String,
      required: true,
    },
    room_name: {
      type: String,
      required: true,
    },
  },
  {
    // this will add fields automatically while creation of document and modification in document
    timestamps: true,
  }
);

export default mongoose.model("bookingDetails", bookingSchema);
