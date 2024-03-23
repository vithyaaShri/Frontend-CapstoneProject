import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdminUser, loginAPICall,saveLoggedInUser, storeToken } from "../service/AuthService";
import Swal from "sweetalert2";
//This is the Login Page for App and is designed based on Spring Security
const LoginComponent = () => {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    const [error, setError] = useState(false);
//This will check if user is "Admin" or "User".If Admin user Rends AdminComp and user means User Components
    const handleLoginForm=async(e)=>{
        e.preventDefault();
        const isAdmin=isAdminUser();
        if(username===""){
          setError(true);
          console.log(error);
          Swal.fire("User Name cannot be empty")
        }
        else if(password===""){
          setError(true);
          console.log(error);
          Swal.fire("Password cannot be empty")
        }
        else{
        
        try {
            const response=await loginAPICall(username,password);  
            const token="Bearer "+response.data.accessToken;
            const role=response.data.role;
            storeToken(token);
            saveLoggedInUser(username,role);
            if(role==="ROLE_ADMIN"){
            navigate("/admin");   
            }
            else{
            navigate("/user");
            }
            window.location.reload(false);

            console.log(response);
        } catch (error) {
          console.log(error);  
        }
      }    
    }
    
  return (
    <section className="background">
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header ">
              <h2 className="text-center text-primary">Login Form</h2>
            </div>
            <div className="card-body ">
              <form >
                <div className="row mb-3">
                  <label className="col-md-3  control-label text-primary">Username</label>
                  <div className="col-md-9  ">
                    <input
                      type="text"
                      name="username"
                      error={!!error}
                      className="form-control"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e)=>setUsername(e.target.value)}
                    required></input>
                  </div>
                </div>
                <div className="row mb-3 ">
                  <label className="col-md-3 control-label text-primary">Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      error={!!error}
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                
                <div className="form-group mb-3 col-md-9 d-flex justify-content-center">
                  <button className="btn btn-primary" onClick={(e)=>handleLoginForm(e)}>Submit</button>
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
export default LoginComponent
