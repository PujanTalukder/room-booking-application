import bookings from "../models/bookingModel.js";

export const getBookings = (req, res) => {
  bookings
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status.json({ err: err.message }));
};

export const addBooking = async (req, res) => {
  const booking = req.body;

  const customer_name = booking.customer_name;
  const date = Date.parse(booking.date);
  const check_in = booking.check_in;
  const check_out = booking.check_out;
  const room_name = booking.room_name;

  const newBooking = new bookings({
    customer_name,
    date,
    check_in,
    check_out,
    room_name,
  });

  const similarBookings = await bookings
    .findOne({
      $and: [{ date }, { check_in }, { check_out }, { room_name }],
    })
    .exec();
  //console.log(similarBookings);
  if (similarBookings) {
    res.status(400).json("room booked already.");
    return;
  } else {
    newBooking
      .save()
      .then(() => res.status(201).json("booking successfull"))
      .catch((err) => res.status(400).json({ message: err.message }));
  }
};

export const getBooking = (req, res) => {
  const id = req.params.id;

  bookings
    .findById(id)
    .then((booking) => res.status(200).json(booking))
    .catch((err) => console.log({ message: err.message }));
};

export const deleteBooking = (req, res) => {
  const id = req.params.id;

  bookings
    .findByIdAndDelete(id, { useFindAndModify: false })
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "some error occured" });
    });
};

export const updateBooking = (req, res) => {
  // storing the url parameter
  const id = req.params.id;

  bookings.findById(id).then((booking) => {
    // storing the url parameter
    const id = req.params.id;

    if (!req.body) {
      res.status(400).send("data to update can not be empty");
    } else {
      bookings
        .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(() => {
          res.status(200).send(`booking updated`);
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: err.message || "some error occured" });
        });
    }
  });
};
