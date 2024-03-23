import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { getAllBus } from "../service/busBooking";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";
import BookingNow from "./BookingNow";
//Used to render User Components When Logged in as a User
const UserComponents = () => {
  const [busFrom, setFrom] = useState(null);
  const [busTo, setTo] = useState(null);
  const [findbus, setfindBus] = useState(false);
  const [fetch_buses, setfetchBus] = useState([]);
  const index = 0;
  const navigate = useNavigate();
//Will give two Box to render from and To Option
  const optionsFrom = [
    { value: "salem", label: "salem" },
    { value: "theni", label: "theni" },
    { value: "chennai", label: "chennai" },
    { value: "trichy", label: "trichy" },
    { value: "dindigul", label: "dindigul" },
    { value: "kanyakumari", label: "kanyakumari" },
    { value: "madurai", label: "madurai" },
    { value: "pudukottai", label: "pudukottai" },
    { value: "thanjavur", label: "thanjavur" },
    { value: "nagapattinam", label: "nagapattinam" },
    { value: "ooty", label: "ooty" },
    { value: "coimbatore", label: "coimbatore" },
    { value: "rameshwaram", label: "rameshwaram" },
  ];
  const optionsTo = [
    { value: "salem", label: "salem" },
    { value: "chennai", label: "chennai" },
    { value: "trichy", label: "trichy" },
    { value: "dindigul", label: "dindigul" },
    { value: "kanyakumari", label: "kanyakumari" },
    { value: "madurai", label: "madurai" },
    { value: "pudukottai", label: "pudukottai" },
    { value: "thanjavur", label: "thanjavur" },
    { value: "nagapattinam", label: "nagapattinam" },
    { value: "ooty", label: "ooty" },
    { value: "coimbatore", label: "coimbatore" },
    { value: "mettur", label: "mettur" },
    { value: "rameshwaram", label: "rameshwaram" },
  ];
  const onCountChange = () => {
    console.log(busID); // returns 0;
  };
  //Navigate to Seating Module
  const handleBooking = (e, bus1id) => {
    e.preventDefault();
    const bus = bus1id;
    navigate(`/SeatPicker/${bus1id}`)
  };
  //Will give Bus Details and Gives Filtered Bus detail from and to
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get("http://localhost:8080/api/bus")
      .then((response) => {
        const buses = response.data;
        const filteredBuses = buses.filter(
          (bus) =>
            bus.pickupLocation.toLowerCase() === busFrom.label &&
            bus.dropLocation.toLowerCase() === busTo.label
        );
        setfetchBus(filteredBuses);
        if(filteredBuses.length>0){
        setfindBus(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching buses:", error);
      });
  };
  return (
    <div className="contfromto">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4 heading">Plan your Journey!</h2>
          <Form>
            <div className="mb-3">
              <label htmlFor="location_from" className="form-label ll">
                From:
              </label>
              <Select
                value={busFrom}
                onChange={setFrom}
                options={optionsFrom}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location_to" className="form-label ll">
                To:
              </label>
              <Select value={busTo} onChange={setTo} options={optionsTo} />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-outline-danger"
                onClick={(e) => handleSubmit(e)}
              >
                Find Buses
              </button>
            </div>
          </Form>
        </div>
      </div>
      {fetch_buses.length ? (
        <div className="container">
          <div className="py-4">
            <table className="table border shadow t2">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Bus Name</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Dep Date</th>
                  <th scope="col">Total seats</th>
                  <th scope="col">Available Seats</th>
                  <th scope="col">Price of Ticket</th>
                  <th scope="col">Book Tickets</th>
                </tr>
              </thead>
              <tbody>
                {fetch_buses.map((bus1, index) => (
                  <tr key={bus1.id}>
                    <td>{bus1.id}</td>
                    <td>{bus1.busName}</td>
                    <td>{bus1.pickupLocation}</td>
                    <td>{bus1.dropLocation}</td>
                    <td>{bus1.departureDate}</td>
                    <td>{bus1.seats}</td>
                    <td>{bus1.available_seats}</td>
                    <td>{bus1.price}</td>

                    {bus1.available_seats > 0 ? (
                      <td>
                        <button
                          type="submit"
                          className="btn btn-outline-danger"
                          onClick={(e) => handleBooking(e, bus1.id)}
                        >
                          Book Now!!
                        </button>
                      </td>
                    ) : (
                      <td>
                        <h6>No seats available</h6>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ):(
        <div className="container mt-5">
          <div className="py-4">
      <h3 className="text-center text-danger ">No buses found in route Choosen</h3>
      <h5 className="text-center text-danger ">Select from and to location above</h5>
      </div></div>)}
    </div>
  );
};

export default UserComponents;
