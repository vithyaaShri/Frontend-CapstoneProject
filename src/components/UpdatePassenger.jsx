import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPassenger } from "../service/passengers";
import { updatePassenger } from "../service/passengers";
import Swal from "sweetalert2";
//Admin role Will Update Passenger Detail on clicking on role
const UpdatePassenger = () => {
  const navigate = useNavigate();
  const [passengerName, setPassengerName] = useState("");
  const [aadharId, setAadharId] = useState();
  const [contactNo, setContactNo] = useState();
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const { id } = useParams();
  const [error, setError] = useState(false);
//Fetch update User from Backend and render on table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPassenger(id);
        const passenger = response.data;
        console.log(passenger);
        setPassengerName(passenger.passengerName);
        setAadharId(passenger.aadharId);
        setContactNo(passenger.contactNo);
        setEmail(passenger.email);
        setAge(passenger.age);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
//Will update Passenger Details
  const changePassenger = async (e) => {
    e.preventDefault();
    if (passengerName == "") {
      setError(true);
      console.log(error);
      Swal.fire("Passenger Name cannot be empty");
    } else if (aadharId == 0) {
      setError(true);
      console.log(error);
      Swal.fire("Aadhar Id cannot be empty");
    } else if (contactNo == 0) {
      setError(true);
      console.log(error);
      Swal.fire("Contact No cannot be empty");
    } else if (email == "") {
      setError(true);
      console.log(error);
      Swal.fire("Email cannot be empty");
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Details has been Update",
        showConfirmButton: false,
        timer: 1500,
      });
      const passenger = {
        passengerName,
        aadharId,
        contactNo,
        email,
        age,
      };
      console.log(id);
      await updatePassenger(id, passenger);
      navigate("/PassengerList");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">PassengerName</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the PassengerName"
                  name="passengerName"
                  error={!!error}
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                />
                <label className="form-label">AadharId</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the aadharId"
                  name="aadharId"
                  error={!!error}
                  value={aadharId}
                  onChange={(e) => setAadharId(e.target.value)}
                />
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter From Contact Number"
                  name="contactNo"
                  error={!!error}
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
                <label className="form-label">setEmail</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter To Email"
                  name="setEmail"
                  error={!!error}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label">age</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the age(Optional)"
                  name="age"
                  error={!!error}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <button
                  className="btn btn-success"
                  style={{ marginTop: "10px" }}
                  onClick={(e) => changePassenger(e)}
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

export default UpdatePassenger;
