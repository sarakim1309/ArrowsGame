import React from 'react'
import './Up.css';
import ArrowUp from './ArrowUp.js';

export default function Up(move, height, width) {
	var rows = [];
	for (var i=0; i < height; i+=60) {
		rows.push(ArrowUp(move, width));
	}
	return (
		<div className = "upDisplay">
			{rows}
		</div>
	)
}