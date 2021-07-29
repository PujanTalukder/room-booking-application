import React, { Component } from "react";
import axios from "axios";
import "./addroom.css";

export default class addRoom extends Component {
  constructor(props) {
    super(props);

    // binding the methods
    this.onChangeRoomname = this.onChangeRoomname.bind(this);
    this.onChangeSeats = this.onChangeSeats.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeAmenities = this.onChangeAmenities.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //initial state of our component
    this.state = {
      room_name: "",
      seat_availibility: 0,
      price: 0,
      amenities: "",
    };
  }

  onChangeRoomname(e) {
    this.setState({
      room_name: e.target.value,
    });
  }

  onChangeSeats(e) {
    this.setState({
      seat_availibility: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeAmenities(e) {
    this.setState({
      amenities: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const room = {
      room_name: this.state.room_name,
      seat_availability: this.state.seat_availibility,
      price: this.state.price,
      amenities: this.state.amenities,
    };

    console.log(room);

    axios
      .post("http://localhost:5000/api/rooms/add", room)
      .then((response) => {
        console.log(response.data);
        alert(response.data);
      })
      .catch((err) => console.log({ error: err.message }));

    this.setState({
      room_name: "",
      seat_availibility: 0,
      price: 0,
      amenities: "",
    });
  }

  render() {
    return (
      <div className="main-container">
        <div className="heading">
          <h2>Add new room</h2>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="input-container">
            <label>Room name :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.room_name}
              onChange={this.onChangeRoomname}
            />
          </div>

          <div className="input-container">
            <label>Seat capacity (in number) :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.seat_availibility}
              onChange={this.onChangeSeats}
            />
          </div>

          <div className="input-container">
            <label>Price :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>

          <div className="input-container">
            <label>Amenities :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.amenities}
              onChange={this.onChangeAmenities}
            />
          </div>

          <div className="input-container">
            <input type="submit" className="submit-button" value="Add Room" />
          </div>
        </form>
      </div>
    );
  }
}
