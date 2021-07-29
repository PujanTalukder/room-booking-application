import rooms from "../models/roomModel.js";

export const getRooms = (req, res) => {
  rooms
    .find()
    .then((rooms) => res.status(200).json(rooms))
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const addRoom = (req, res) => {
  const room_name = req.body.room_name;
  const seat_availability = Number(req.body.seat_availability);
  const price = Number(req.body.price);
  const amenities = req.body.amenities;

  const newRoom = new rooms({
    room_name,
    seat_availability,
    price,
    amenities,
  });

  newRoom
    .save()
    .then(() => res.status(201).json("new room added to DB"))
    .catch((err) => res.status(400).json({ message: err.message }));
};
