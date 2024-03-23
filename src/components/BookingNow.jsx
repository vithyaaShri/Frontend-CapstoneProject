import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getBus, updateTickets } from "../service/busBooking";
import { addBooking } from "../service/passengers";
import Swal from "sweetalert2";
//Booking Now renders after choosing seat it ask to add passenger and make payment
const BookingNow = () => {
  let [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  let date = new Date();
  let today = new Date().toISOString().slice(0, 10);
  const [passengerName, setPassengerName] = useState("");
  const [aadharId, setAadarId] = useState();
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [contactNo, setContactNo] = useState();
  const [journeyStat, setJourneyStat] = useState(true);
  const [cancelStat, setCancelStat] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [bookingDate, setDate] = useState("");
  const [price, setPrice] = useState();
  const [totalamount, setTotal] = useState();
  const [bookid] = useState(Math.random().toString(36).substr(2, 8));
  const [busName, setbusname] = useState("");
  const [fee, setFee] = useState();
  const [departureDate, setDdate] = useState();
  const [busId, setBusId] = useState();
  const [error, setError] = useState(false);
  //It loads Bus details based on bus id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBus(id);
        const bus = response.data;
        const p = bus.price;
        setPrice(p);
        setCount(count);
        setBookingId("YEO" + bookid);
        setDate(today);
        setTotal(p);
        setBusId(bus.id);
        const name = bus.busName;
        setbusname(name);
        setFee(bus.price);
        const datee = bus.departureDate;
        setDdate(datee);
        console.log(bus);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  function onsetTotal() {
    setTotal((count + 1) * price);
  }
//When clicking on make payment button will perform e-ticket generating process
  const paymentclickhandler = async (e) => {
    e.preventDefault();
    onsetTotal();

    await updateTickets(busId, count);
    Swal.fire({
      title: `Total amount:${totalamount}`,
      text: "Get your e-tickets by clicking E-ticket button on top!!",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Pay now!!",
      denyButtonText: `Pay Later!!`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Payment success!", "", "");
        navigate("/user");
      } else if (result.isDenied) {
        Swal.fire("Pay amount during your Journey", "");
        navigate("/user");
      }
    });
  };
  //Will add multiple  passenger with different registered email
  const handleAddPassenger = async (e) => {
    e.preventDefault();
    if (passengerName == "") {
      setError(true);
      console.log(error);
      Swal.fire("Passenger Name cannot be empty");
    } else if (aadharId == 0) {
      setError(true);
      console.log(error);
      Swal.fire("Aadhar id cannot be empty");
    } else if (contactNo == 0) {
      setError(true);
      console.log(error);
      Swal.fire("Contact Number cannot be empty");
    } else if (email == "") {
      setError(true);
      console.log(error);
      Swal.fire("Email cannot be empty");
    } else {
      console.log("clicked");
      count = count + 1;
      setCount(count);
      const passenger = {
        passengerName,
        aadharId,
        contactNo,
        email,
        age,
        journeyStat,
        cancelStat,
      };
      console.log(passenger);
      setBookingId("YEO" + bookid);
      setDate(today);
      const booking = {
        bookingId,
        bookingDate,
        busName,
        fee,
        departureDate,
        passenger,
      };
      console.log(booking);
      const response = await addBooking(booking);
      setPassengerName("");
      setEmail("");
      setAadarId(0);
      setAge(0);
      setContactNo(0);
    }
  };
  //Used for handling use State and input element
  const change1 = (event) => setPassengerName(event.target.value);
  const change2 = (event) => setAadarId(event.target.value);
  const change3 = (event) => setEmail(event.target.value);
  const change4 = (event) => setAge(event.target.value);
  const change5 = (event) => setContactNo(event.target.value);

  return (
    <div className="cont2">
      <div className="card w-50 mx-auto mt-3 mb-5">
        <div className="card-header">Add Passenger {count + 1}</div>
        <div className="card-body">
          <Form id="myForm">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name of Passenger
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                error={!!error}
                value={passengerName}
                onChange={change1}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="aadhar" className="form-label">
                Aadhar Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your 12 digit aadhar number..."
                id="aadhar"
                name="aadhar"
                error={!!error}
                value={aadharId}
                onChange={change2}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                error={!!error}
                value={email}
                onChange={change3}
              />
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="text"
                className="form-control"
                id="age"
                name="age"
                value={age}
                onChange={change4}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                id="contact"
                error={!!error}
                name="contact"
                value={contactNo}
                onChange={change5}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={(e) => handleAddPassenger(e)}
              >
                Add Passenger
              </button>
            </div>
          </Form>
        </div>
        <div className="card-footer text-center">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={(e) => paymentclickhandler(e)}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingNow;
