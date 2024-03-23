import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

//Admin comp is the home page when entered as admin

const AdminComp = () => {
  const navigate = useNavigate();
  const logOut = (e) => {
    navigate("/");
  };
  //It contains three cards - One for manageing bus list,one for managing passenger list
  //and third one for managing Add bus functionality
  return (
    <div className="container mt-2" style={{ padding: "6rem" }}>
      <h2 className="text-center mb-4">Admin Dashboard!</h2>
      <div className="col">
        <div className="row-md-6 mb-4 ">
          <Card>
            <Card.Header as="h5" className="text-center">
              Features Available
            </Card.Header>
            <Card.Body className="text-center">
              <Card.Title className=".bg-primary">Bus List</Card.Title>
              <Card.Text>This will give the List of buses.</Card.Text>
              <Link to="/busList">
                <Button variant="danger">Show Bus List</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="row-md-6 mb-4">
          <Card>
            <Card.Body className="text-center">
              <Card.Title>User List</Card.Title>
              <Card.Text>This will give List of Users.</Card.Text>
              <Link to="/PassengerList">
                <Button variant="danger">Show User List</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="row-md-6 mb-4">
          <Card>
            <Card.Body className="text-center">
              <Card.Title>Add Bus</Card.Title>
              <Card.Text>Add a new bus to the Bus List.</Card.Text>
              <Link to="/addbus">
                <Button variant="danger">Add Bus</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminComp;
