import React from "react";
import './HomePage.css';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate("/Game");
  }

  const Rules = () => {
    navigate("/Rules")
  }
  return (
    <div className= "title"> ReactIonGame
        <div className="HP">
          <div className="HP-arrows"></div>
          <div className="HP-arrows"></div>
        </div>
        <div className="HP-buttons">
          <button type="button" className="btn btn-primary btn-lg startSize" onClick={handleClick}>Start</button>
          <button type="button" className="btn btn-primary btn-lg startSize" onClick={Rules}>Rules</button>
        </div>
    </div>
  );
}

export default HomePage;