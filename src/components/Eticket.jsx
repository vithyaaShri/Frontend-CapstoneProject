import React, { useState } from "react";
import { getEmail } from "../service/passengers";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//Will generate E-ticket based on email of the Passenger

const Eticket = () => {
  const [email, setEmail] = useState("");
  const [ticket, setTicket] = useState(false);
  const [passengerid, setPassenger] = useState();
  const [passengerName, setPassengerName] = useState("");
  const [aadhar, setAdharId] = useState();
  const [age, setAge] = useState();
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const change1 = (event) => setEmail(event.target.value);

  //Will navigate to View Ticket Page by rendering ViewComponent
  const handleViewTicket = (id) => {
    navigate(`/view/${id}`);
  };
//Clicking on Search will render it
  const ticketclickhandler = async (e) => {
    e.preventDefault();
    if (email === "") {
      setError(true);
      console.log(error);
      Swal.fire("Email cannot be empty");
    }
    const response = await getEmail(email);
    const passengerTicket = response.data;
    setPassenger(response.data.id);
    setPassengerName(response.data.passengerName);
    setAdharId(response.data.aadharId);
    setAge(response.data.age);
    setStatus(response.data.journeyStat);
    console.log(response.data.id);
    console.log(passengerTicket);
    setTicket(true);
  };
  
  return (
    <div className="cont2">
      <div className="card w-50 mx-auto mt-3 mb-5">
        <div className="card-header text-center">E-ticket</div>
        <div className="card-body">
          <Form id="myForm">
            <div className="mb-3 ">
              <label htmlFor="name" className="form-label ">
                Enter your Email
              </label>
              <input
                type="text"
                className="form-control"
                error={!!error}
                id="email"
                name="email"
                value={email}
                onChange={change1}
              />
            </div>
            <div class="text-center">
              <button
                type="button"
                className="btn btn-outline-danger text-center"
                onClick={(e) => ticketclickhandler(e)}
              >
                Search
              </button>
            </div>
          </Form>
        </div>
      </div>
      {ticket && (
        <div className="container">
          <div className="py-4">
            <table className="table border shadow t2">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Passenger Name</th>
                  <th scope="col">Aadhar Id</th>
                  <th scope="col">Age</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{passengerid}</td>
                  <td>{passengerName}</td>
                  <td>{aadhar}</td>
                  <td>{age}</td>
                  <td>{email}</td>
                  <td>
                    <button
                      type="submit"
                      className="btn btn-outline-danger"
                      onClick={(e) => handleViewTicket(passengerid)}
                    >
                      View Ticket
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eticket;
