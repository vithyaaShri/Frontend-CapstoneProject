import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooking } from "../service/passengers";
import { useEffect } from "react";
import { cancelTicket } from "../service/passengers";
import Swal from "sweetalert2";

//Will give Access to View all the booking Made by user and Cancel Ticket
const MyBooking = () => {
const[cancelStat,setCancelStat]=useState(false);
const[passengerid,setPassengerid]=useState();
  const [booking, setBooking] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

//Will fetch all the value from BusBooking table
  useEffect(() => {
    listBooking();
  }, []);
  const listBooking = async () => {
    try{
    const response = await getAllBooking();
    console.log(response.data);
    setBooking(response.data);
    console.log(booking);
    }catch(error){
      console.log(error);
    }
  };
//Will change status to cancel on Clicking on cancel Ticket Button
  const handleUpdate = async (id) => {
    try {
        Swal.fire("Booking Canceled");
        console.log(id);
        const response=await cancelTicket(id);
        console.log(response.data);
        console.log(response.data.id)
        setCancelStat(response.data.cancelStat)
        listBooking();
        setPassengerid(response.data.id)
        console.log(response.data.cancelStat)
    } catch (error){
        console.log(error);
    }
  };
  const NavigatetoBook=()=>{
        navigate("/user")
  }
  
  return (
    <div className="container">
      <h2 className="text-center">List of Booking</h2>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th className="text-center">BookingID</th>
              <th className="text-center">Bus Name</th>
              <th className="text-center">Passenger Name</th>
              <th className="text-center">Departure Date</th>
              <th className="text-center">Contact No</th>
              <th className="text-center">Email</th>
              <th className="text-center">Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((book) => (
              <tr key={book.id}>
                <td className="text-center">{book.bookingId}</td>
                <td className="text-center">{book.busName}</td>
                <td className="text-center">{book.passenger.passengerName}</td>
                <td className="text-center">{book.departureDate}</td>
                <td className="text-center">{book.passenger.contactNo}</td>
                <td className="text-center">{book.passenger.email}</td>
                <td className="text-center">
                  {book.passenger.cancelStat
                    ? "Journey Status:Canceled":"Journey Status:Confirmed" }
                </td>
                <td>
                <button
                    className="btn btn-success"
                    style={{ marginLeft: "25px" }}
                    onClick={() => handleUpdate(book.passenger.id)}
                    disabled={isButtonDisabled}
                  >
                    CancelTicket
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
