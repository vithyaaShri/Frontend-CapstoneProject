import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteBus, getAllBus } from "../service/busBooking";
import Swal from "sweetalert2";


//Bus List is rendered in admin page . Allow to update and delete bus details
const BusList = () => {
  const [buses, setBus] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    listBus();
  }, []);
//fetching bus details from backend and storing in use State
  const listBus = async () => {
    const response = await getAllBus();
    console.log(response.data);
    setBus(response.data);
    console.log(buses);
  };

//Clicking on update button will render UpdateBus Component
  const handleUpdate = (id) => {
    navigate(`/updatebus/${id}`);
  };

//Clicking on delete wil delete bus details from backend
  const handleDelete = async (id) => {
    try {
      const response = await deleteBus(id);
      Swal.fire("Bus Details Deleted");
      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Buses</h2>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th className="text-center">Bus Id</th>
              <th className="text-center">Bus Name</th>
              <th className="text-center">Pickup Location</th>
              <th className="text-center">Drop Location</th>
              <th className="text-center">Total Seats</th>
              <th className="text-center">Available Seats</th>
              <th className="text-center">DepartureDate</th>
              <th className="text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td className="text-center">{bus.id}</td>
                <td className="text-center">{bus.busName}</td>
                <td className="text-center">{bus.pickupLocation}</td>
                <td className="text-center">{bus.dropLocation}</td>
                <td className="text-center">{bus.seats}</td>
                <td className="text-center">{bus.available_seats}</td>
                <td className="text-center">{bus.departureDate}</td>
                <td className="text-center">{bus.price}</td>

                <td>
                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "25px" }}
                    onClick={() => handleUpdate(bus.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "25px" }}
                    onClick={() => handleDelete(bus.id)}
                  >
                    Delete
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

export default BusList;
