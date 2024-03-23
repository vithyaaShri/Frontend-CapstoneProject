import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPassenger } from "../service/passengers";

//It will render Passenger List When Logged as Admin
const PassengerList = () => {
  const [passengers, setPassenger] = useState([]);
  const navigate = useNavigate();
//Data is fetched from backend
  useEffect(() => {
    listPassenger();
  }, []);

  const listPassenger = async () => {
    const response = await getAllPassenger();
    console.log(response.data);
    setPassenger(response.data);
    console.log(passengers);
  };
//Update the Passenger Detail when Update button is Pressed.
  const handleUpdate = (id) => {
    navigate(`/updatePassenger/${id}`);
  };
  return (
    <div className="container">
      <h2 className="text-center ">List of Buses</h2>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th className="text-center">Passenger Name</th>
              <th className="text-center">Aadhar Id</th>
              <th className="text-center">Contact No</th>
              <th className="text-center">Email</th>
              <th className="text-center">Age</th>
              <th className="text-center">Booking Status</th>
            </tr>
          </thead>

          <tbody>
            {passengers.map((passenger) => (
              <tr key={passenger.id}>
                <td className="text-center">{passenger.passengerName}</td>
                <td className="text-center">{passenger.aadharId}</td>
                <td className="text-center">{passenger.contactNo}</td>
                <td className="text-center">{passenger.email}</td>
                <td className="text-center">{passenger.age}</td>
                <td className="text-center">
                  {passenger.cancelStat ? "Cancelled" : "Confirmed"}
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "25px" }}
                    onClick={() => handleUpdate(passenger.id)}
                  >
                    Update
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

export default PassengerList;
