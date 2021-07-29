import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import bookingLog from "./components/bookingLog.component";
import addRoom from "./components/addRoom";
import bookRoom from "./components/bookRoom";
import editBooking from "./components/editbooking.component";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Route path="/" exact component={bookingLog} />
        <Route path="/addRoom" exact component={addRoom} />
        <Route path="/editBooking/:id" exact component={editBooking} />
        <Route path="/bookRoom" exact component={bookRoom} />
      </div>
    </Router>
  );
}

export default App;
