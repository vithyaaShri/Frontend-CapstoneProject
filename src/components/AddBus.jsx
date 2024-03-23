import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBus } from "../service/busBooking";
import Swal from "sweetalert2";

//Add bus renders only for admin user

const AddBus = () => {
  const navigate = useNavigate();
  const [busName, setbusName] = useState("");
  const [departureDate, setDoj] = useState("");
  const [pickupLocation, setFrom] = useState("");
  const [dropLocation, setTo] = useState("");
  const [price, setPrice] = useState();
  const [seats, setSeats] = useState();
  const [available_seats, setAvailableSeats] = useState();
  const [error, setError] = useState(false);
 
//Save bus saves the details entered to backend
  const saveBus = async (e) => {
    e.preventDefault();
    console.log(departureDate)
    const bus = {
      busName,
      departureDate,
      pickupLocation,
      dropLocation,
      price,
      seats,
      available_seats,
    };
    //User for checking required field
    if(busName===""){
      setError(true);
      console.log(error);
      Swal.fire("Bus Name cannot be empty")
    }
    else if(!departureDate){
      setError(true);
      console.log(error);
      Swal.fire("Departure date cannot be empty")
    }
    else if(pickupLocation===""){
      setError(true);
      console.log(error);
      Swal.fire("Pick Up Location cannot be empty")
    }
    else if(dropLocation===""){
      setError(true);
      console.log(error);
      Swal.fire("Drop Location cannot be empty")
    }
    else if(price==0){
      setError(true);
      console.log(error);
      Swal.fire("Price cannot be empty")
    }
    else if(seats==0){
      setError(true);
      console.log(error);
      Swal.fire("Seats cannot be empty")
    }
    else if(available_seats==0){
      setError(true);
      console.log(error);
      Swal.fire("Available Seats cannot be empty")
    }
    //Add bus to backend
    else{
    console.log(bus);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Details has been Saved",
      showConfirmButton: false,
      timer: 1500,
    });
    const response = await addBus(bus);
    console.log(response);
    navigate("/addbus");
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Bus Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the BusName"
                  name="busName"
                  error={!!error}
                  required
                  value={busName}
                  onChange={(e) => setbusName(e.target.value)}
                  helperText={error?'this bus name field is required':''}
                />
                <label className="form-label">Date of Journey</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Journey Date(YYYY-MM-DD)"
                  required
                  name="doj"
                  error={!!error}
                  value={departureDate}
                  onChange={(e) => setDoj(e.target.value)}
                  helperText={error?'this Departure field is required':''}
                />
                <label className="form-label">From</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter From location"
                  name="from"
                  error={!!error}
                  required
                  value={pickupLocation}
                  onChange={(e) => setFrom(e.target.value)}
                  helperText={error?'this Pick up Location field is required':''}
                />
                <label className="form-label">To</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter To location"
                  name="to"
                  error={!!error}
                  required
                  value={dropLocation}
                  onChange={(e) => setTo(e.target.value)}
                  helperText={error?'this drop Field is required':''}
                />
                <label className="form-label">Price</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the price"
                  error={!!error}
                  name="price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  helperText={error?'this price is required':''}
                />
                <label className="form-label">Total Seats</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the total seats"
                  error={!!error}
                  name="seats"
                  required
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  helperText={error?'this Total Seats is required':''}
                />
                <label className="form-label">Available Seats</label>
                <input
                  type="text"
                  className="form-control"
                  error={!!error}
                  placeholder="Enter the Available seats"
                  name="seats"
                  required
                  value={available_seats}
                  onChange={(e) => setAvailableSeats(e.target.value)}
                  helperText={error?'this Seats is required':''}
                />
                <button
                  className="btn btn-success"
                  style={{ marginTop: "10px" }}
                  onClick={(e) => saveBus(e)}
                >
                   Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBus;
