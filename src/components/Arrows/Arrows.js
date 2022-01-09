import React from 'react'
import './Arrows.css';

export default function Arrows(style, height, width) {
	var rows = [];
	console.log(style)
	for (var i=0; i < Math.floor(height/66); i++) {
		rows.push(Arrow(style, width));
	}
	return (
		<div className = "ArrowsDisplay">
			{rows}
		</div>
	)
}

function Arrow(style, width) {
	var rows = [];
	for (var i=0; i < Math.floor(width/60); i++) {
		rows.push(<span key={i}></span>);
	}
	return (
		<div className= {style}>
			{rows}
		</div>
	)
}