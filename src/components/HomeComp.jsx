import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import offer1 from "../images/offer1.png";
import offer2 from "../images/offer2.png";
import offer3 from "../images/offer3.png";
import offer4 from "../images/offer4.png";
import offer5 from "../images/offer5.png";
//Home Component is a home page and does no contain any functionality of App
const HomeComp = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/AboutUs");
  };
  const toggalState = () => {
    setModal(!modal);
  };

  return (
    <div className="homeComp">
      <h1>India's No. 1 Online Bus Ticket Booking Site</h1>
      <h1 className="headerTile">A lifetime of discount !!! Its Genius</h1>
      <p className="headerDesc">
        Get rewarded for your travels - Unlock instant savings of 10% or More
        with free booking Account
      </p>
      <button
        className="btn btn-secondary"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Explore More
      </button>
      <div className="offer">
        <img
          src={offer1}
          width="200"
          height="auto"
          className="offerAll"
          onClick={toggalState}
        ></img>
        <div className="modal">
          <div className="overlay">
            <h2>Offers</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae ea
              eius quis nesciunt. Quibusdam a molestiae earum magnam suscipit
              commodi. Ratione harum nisi ad culpa nobis sint dicta dolores
              quos?
            </p>
            <button className="close-modal" onClick={toggalState}>
              CLOSE
            </button>
          </div>
        </div>
        <img src={offer2} width="200" height="auto" className="offerAll"></img>
        <img src={offer3} width="200" height="auto" className="offerAll"></img>
        <img src={offer4} width="200" height="auto" className="offerAll"></img>
        <img src={offer4} width="200" height="auto" className="offerAll"></img>
        <img src={offer5} width="200" height="auto" className="offerAll"></img>
      </div>
    </div>
  );
};

export default HomeComp;
