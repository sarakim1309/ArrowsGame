import React from "react";
import './HomePage.css';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate("/Game");
  }
  return (
    <div className= "HP"> Arrows
        <div className="HP-text">
            <button type="button" class="btn btn-primary btn-lg startSize" onClick={handleClick}>Start</button>
        </div>
        <div class="arrows"></div>
    </div>
  );
}

export default HomePage;