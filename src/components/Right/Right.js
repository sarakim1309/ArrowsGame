import React from 'react'
import './Right.css';
import ArrowRight from './ArrowRight.js';

export default function Right(move, height, width) {
	var rows = [];
	for (var i=0; i < height; i+=60) {
		rows.push(ArrowRight(move, width));
	}
	return (
		<div className = "rightDisplay">
			{rows}
		</div>
	)
}