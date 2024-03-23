import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBus, updateBus } from "../service/busBooking";
import Swal from "sweetalert2";

const UpdateBus = () => {
  const navigate = useNavigate();
  const [busName, setbusName] = useState("");
  const [departureDate, setDoj] = useState("");
  const [pickupLocation, setFrom] = useState("");
  const [dropLocation, setTo] = useState("");
  const [price, setPrice] = useState();
  const [seats, setSeats] = useState();
  const [available_seats, setAvailableSeats] = useState();
  const { id } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBus(id);
        const bus = response.data;
        console.log(bus);
        setbusName(bus.busName);
        setAvailableSeats(bus.available_seats);
        setDoj(bus.departureDate);
        setFrom(bus.pickupLocation);
        setTo(bus.dropLocation);
        setPrice(bus.price);
        setSeats(bus.seats);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const upBus = async (e) => {
    e.preventDefault();

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
      window.alert("Update Saved Sucessfully!!!")
    }
    else{
    const bus = {
      busName,
      departureDate,
      pickupLocation,
      dropLocation,
      price,
      seats,
      available_seats,
    };
    console.log(id);
    await updateBus(id, bus);
    Swal.fire("Saved Successfully!!!")
    navigate("/admin");
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
                  value={busName}
                  onChange={(e) => setbusName(e.target.value)}
                />
                <label className="form-label">Date of Journey</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Journey Date"
                  name="doj"
                  error={!!error}
                  value={departureDate}
                  onChange={(e) => setDoj(e.target.value)}
                />
                <label className="form-label">From</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter From location"
                  name="from"
                  error={!!error}
                  value={pickupLocation}
                  onChange={(e) => setFrom(e.target.value)}
                />
                <label className="form-label">To</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter To location"
                  name="to"
                  error={!!error}
                  value={dropLocation}
                  onChange={(e) => setTo(e.target.value)}
                />
                <label className="form-label">Price</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the price"
                  name="price"
                  error={!!error}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label className="form-label">Total Seats</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the total seats"
                  name="seats"
                  error={!!error}
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                />
                <label className="form-label">Available Seats</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Available seats"
                  name="seats"
                  error={!!error}
                  value={available_seats}
                  onChange={(e) => setAvailableSeats(e.target.value)}
                />
                <button
                  className="btn btn-success"
                  style={{ marginTop: "10px" }}
                  onClick={(e) => upBus(e)}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBus;
