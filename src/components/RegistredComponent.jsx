import React, { useState } from "react";
import { registerAPICall } from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//It is User Registration form to register new User
const RegistredComponent = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
//Register Button will store saving details to Backend
  const handleRegistrationForm = async (e) => {
    e.preventDefault();
    if (username == "") {
      setError(true);
      console.log(error);
      Swal.fire("User Name cannot be empty");
    } else if (name == "") {
      setError(true);
      console.log(error);
      Swal.fire("Name cannot be empty");
    } else if (password == "") {
      setError(true);
      console.log(error);
      Swal.fire("Password cannot be empty");
    } else if (email == "") {
      setError(true);
      console.log(error);
      Swal.fire("Email cannot be empty");
    } else {
      try {
        const registerobj = { name, username, password, email };
        const response = await registerAPICall(registerobj);
        Swal.fire("User Registered Succesfully")
        navigate("/login");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="background">
      <div className="container mt-5">
        <div className="row ">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">
                <h2 className="text-center text-primary">
                  User Registration Form
                </h2>
              </div>

              <div className="card-body">
                <form>
                  <div className="row mb-3">
                    <label className="col-md-3 control-label text-primary">
                      Name
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        name="Name"
                        className="form-control"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                       
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 control-label text-primary">
                      Username
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        name="username"
                        error={!!error}
                        className="form-control"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 control-label text-primary">
                      Password
                    </label>
                    <div className="col-md-9">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        error={!!error}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 control-label text-primary">
                      Email
                    </label>
                    <div className="col-md-9 ">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        error={!!error}
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                      ></input>
                    </div>
                  </div>
                  <div className="form-group mb-3 col-md-9 d-flex justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => handleRegistrationForm(e)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RegistredComponent;
