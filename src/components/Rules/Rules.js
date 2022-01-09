import React from "react";
import './Rules.css';
import { useNavigate } from "react-router-dom";

export default function Rules() {
	const navigate = useNavigate();

	const goBack = () => {
	    navigate("/");
	}
	
	return (
		<div>
			<h1 className="R-title">
				Rules
			</h1>
			<div className="rules">
				There are 3 types of arrows:
				<span style={{color: 'seagreen'}}> green</span>, 
				<span style={{color: 'orangered'}}> orange</span> and 
				<span style={{color: 'darkred'}}> red</span>.
			</div>
			<p className="rules">
				If you see a <span style={{color: 'seagreen'}}> green</span> one, you have to press to the direction it is <b>pointing</b>.
			</p>
			<p className="rules">
				If you see an <span style={{color: 'orangered'}}> orange</span> one, you have to press to the direction it is <b>moving</b>.
			</p>
			<p className="rules">
				And if you see a<span style={{color: 'darkred'}}> red</span> one, <b>don't do anything</b>.
			</p>
			<p className="rules">
				There's an easy mode where the different types of arrows are added gradually.
				In that mode, arrows are relatively slow.
			</p>
			<p className="rules">
				There's also a difficult mode where the different types of arrows are... relatively fast.
			</p>
			<p className="rules">
				It will always start to the right, so at least you should score 1.
			</p>
			<button type="button" className="btn btn-primary btn-lg goBack" onClick={goBack}>Go Back</button>
		</div>
	)
}