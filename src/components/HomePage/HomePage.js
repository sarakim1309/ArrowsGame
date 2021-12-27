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
            <button type="button" className="btn btn-primary btn-lg startSize" onClick={handleClick}>Start</button>
        </div>
{/*        <div className="HP-text">
            <button type="button" class="btn btn-primary btn-lg startSize" onClick={handleClick}>Reglas</button>
        </div>*/}
        <div className="arrows"></div>
    </div>
  );
}

export default HomePage;