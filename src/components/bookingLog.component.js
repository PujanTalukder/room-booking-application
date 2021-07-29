import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./bookinglog.css";

const Bookings = (props) => (
  <tr>
    <td>{props.booking.room_name}</td>
    <td>{props.booking.customer_name}</td>
    <td>{props.booking.date.substring(0, 10)}</td>
    <td>{props.booking.check_in}</td>
    <td>{props.booking.check_out}</td>
    <td>
      <Link className="update-link" to={"/editBooking/" + props.booking._id}>
        <button id="update-button">edit</button>
      </Link>
      |
      <button
        id="delete-button"
        onClick={() => {
          props.deleteBooking(props.booking._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

export default class bookingLog extends Component {
  constructor(props) {
    super(props);

    this.deleteBooking = this.deleteBooking.bind(this);

    // initialize states
    this.state = { bookings: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/bookings/")
      .then((response) => {
        this.setState({ bookings: response.data });
      })
      .catch((err) => console.log({ message: err.message }));
  }

  deleteBooking(id) {
    axios
      .delete("http://localhost:5000/api/bookings/delete/" + id)
      .then((response) => console.log(response.data))
      .catch((err) => console.log({ message: err.message }));

    this.setState({
      bookings: this.state.bookings.filter((del) => del._id !== id),
    });
  }

  bookinglist() {
    return this.state.bookings.map((currentBooking) => {
      return (
        <Bookings
          booking={currentBooking}
          deleteBooking={this.deleteBooking}
          key={currentBooking._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="main-container">
        <div className="add-room">
          <Link className="link" to={"/addRoom"}>
            <button>Add new room</button>
          </Link>
        </div>
        <div className="logs">
          <h2>Booking Logs</h2>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Room Name</th>
                <th>Customer Name</th>
                <th>Booking Date</th>
                <th>Check in</th>
                <th>Check out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.bookinglist()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
