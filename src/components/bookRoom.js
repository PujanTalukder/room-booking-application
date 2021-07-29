import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgCalendarDates } from "react-icons/cg";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import "./addroom.css";
import axios from "axios";

export default class bookRoom extends Component {
  constructor(props) {
    super(props);

    // binding the methods
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCheckin = this.onChangeCheckin.bind(this);
    this.onChangeCheckout = this.onChangeCheckout.bind(this);
    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // initializing the sates
    this.state = {
      customer_name: "",
      date: new Date(),
      check_in: "",
      check_out: "",
      room_name: "",
      rooms: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/rooms/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          rooms: response.data.map((rooms) => rooms.room_name),
          room_name: response.data[0].room_name,
        });
      }
    });
  }

  onChangeName(e) {
    this.setState({
      customer_name: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  onChangeCheckin(e) {
    this.setState({
      check_in: e.target.value,
    });
  }
  onChangeCheckout(e) {
    this.setState({
      check_out: e.target.value,
    });
  }
  onChangeRoom(e) {
    this.setState({
      room_name: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const booking = {
      customer_name: this.state.customer_name,
      date: this.state.date,
      check_in: this.state.check_in,
      check_out: this.state.check_out,
      room_name: this.state.room_name,
    };

    console.log(booking);

    axios
      .post("http://localhost:5000/api/bookings/add", booking)
      .then((response) => {
        alert(response.data);
      })
      .catch(() => alert("room booked already"));
  }

  render() {
    return (
      <div className="main-container">
        <div className="heading">
          <h2>Book Rooms</h2>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="input-container">
            <label>Name :</label>
            <input
              type="text"
              required
              value={this.state.customer_name}
              className="form-control"
              onChange={this.onChangeName}
            />
          </div>
          <div className="input-container" id="times">
            <div>
              <label>Date :</label> <br />
              <div className="time-inputs">
                <IconContext.Provider value={{ className: "react-icons" }}>
                  <div>
                    <CgCalendarDates />
                  </div>
                </IconContext.Provider>

                <DatePicker
                  className="form-control"
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
            <div>
              <label>Check in :</label> <br />
              <div className="time-inputs">
                <IconContext.Provider value={{ className: "react-icons" }}>
                  <div>
                    <AiOutlineClockCircle />
                  </div>
                </IconContext.Provider>
                <input
                  type="text"
                  required
                  value={this.state.check_in}
                  className="form-control"
                  onChange={this.onChangeCheckin}
                  placeholder="hh:mm am or pm"
                />
              </div>
            </div>
            <div>
              <label>Check out :</label> <br />
              <div className="time-inputs">
                <IconContext.Provider value={{ className: "react-icons" }}>
                  <div>
                    <AiOutlineClockCircle />
                  </div>
                </IconContext.Provider>

                <input
                  type="text"
                  required
                  value={this.state.check_out}
                  className="form-control"
                  onChange={this.onChangeCheckout}
                  placeholder="hh:mm am or pm"
                />
              </div>
            </div>
          </div>
          <div className="input-container">
            <label>Select Room :</label>
            <select
              id="inputState"
              required
              className="form-control"
              value={this.state.room_name}
              onChange={this.onChangeRoom}
            >
              {this.state.rooms.map((room) => {
                return (
                  <option value={room} key={room}>
                    {room}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-container">
            <input type="submit" className="submit-button" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
