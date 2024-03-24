import React, { useEffect} from 'react'
import { useNavigate} from "react-router-dom";
import { getLoggedInUser } from '../service/AuthService';
import { useState } from 'react';
import { modifyPassword} from '../service/ChangePass';

//Change Password is for User Login and User can change their password
const ChangePassword = () => {
  const[username,setUsername]=useState("");
  const[oldPassword,setOldPassword]=useState("");
  const[newPassword,setNewPassword]=useState("");
  const loggesUser=getLoggedInUser();
  const navigate=useNavigate();

//fetch logged in User detail from backend
  useEffect(() => {
    setUsername(loggesUser);
    console.log(username);
  })
  
//Will update password in backend
  const resetPassword =async (e) => {
    e.preventDefault();
    const user = {
      username,
      oldPassword,
      newPassword
    };
    await modifyPassword(user);
    window.alert("Password Updated Successfully!!!")
    navigate("/user");
  };
  
  
  return (
    
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Password Change</h2>
            </div>
            <div className="card-body">
              <form className="row mb-3">
                <div className="row mb-3">
                  <label className="col-md-4  control-label">Username</label>
                  <div className="col-md-9 ">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter Username"
                      value={username}
                    required></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-4 control-label">Enter Old Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={oldPassword}
                      onChange={(e)=>setOldPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-4 control-label">Enter New-Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Confirm Password"
                      value={newPassword}
                      onChange={(e)=>setNewPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                
                <div className="form-group mb-3 col-md-9">
                  <button className="btn btn-primary" onClick={(e)=>resetPassword(e)}>Update Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword
