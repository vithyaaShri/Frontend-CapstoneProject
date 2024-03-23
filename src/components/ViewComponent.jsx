import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPassenger, getPassengerById } from "../service/passengers";
import { useEffect } from "react";
//Used To View E-ticket rendered after searching eticket Based On Email
const ViewComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [passengerid, setPassenger] = useState();
  const [passengerName, setPassengerName] = useState("");
  const [aadhar, setAdharId] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookId, setBookId] = useState("");
  const [busname, setBusname] = useState("");
  const [departure, setDeparture] = useState("");

  const homePage = (e) => {
    e.preventDefault();
    navigate("/user");
  };
  //Used to fetch passenger Details in backGround
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getPassenger(id);
          const response1 = await getPassengerById(response.data.id);
          setBookDate(response1.data.bookingDate);
          console.log(response1);
          const passenger = response.data;
          // Set the fetched details to use state
          setPassenger(response.data.id);
          setPassengerName(response.data.passengerName);
          setAdharId(response.data.aadharId);
          setAge(response.data.age);
          setEmail(response.data.email);
          setBookId(response1.data.bookingId);
          setBusname(response1.data.busName);
          setDeparture(response1.data.departureDate);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  //Used for Style card details
  const divStyle = {
    color: "black",
    backgroundColor: "DodgerBlue",
    width: "30rem",
    margin: "auto",
    marginTop: "100px",
  };
  return (
    <div class="card" style={divStyle}>
      <div class="card-header">E-Ticket</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Passenger Id: {passengerid}</li>
        <li class="list-group-item">Passenger Name: {passengerName}</li>
        <li class="list-group-item">Aadhar Id: {aadhar}</li>
        <li class="list-group-item">Age: {age}</li>
        <li class="list-group-item">Email: {email}</li>
        <li class="list-group-item">Booking date: {bookDate}</li>
        <li class="list-group-item">Booking Id: {bookId}</li>
        <li class="list-group-item">Bus Name: {busname}</li>
        <li class="list-group-item">Departure Date: {departure}</li>
      </ul>
      <button className="btn btn-secondary" onClick={(e) => homePage(e)}>
        Back to home page
      </button>
    </div>
  );
};

export default ViewComponent;
