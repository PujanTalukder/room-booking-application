// module
import mongoose from "mongoose";

// defining schema
const roomSchema = mongoose.Schema(
  {
    room_name: {
      // validations
      type: String,
      required: true,
      unique: true,
    },
    seat_availability: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amenities: {
      type: String,
    },
  },
  {
    // this will add fields automatically while creation of document and modification in document
    timestamps: true,
  }
);

export default mongoose.model("roomDetails", roomSchema);
