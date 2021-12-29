import React from 'react'
import './Down.css';
import ArrowDown from './ArrowDown.js';

export default function Down(move, height, width) {
	var rows = [];
	for (var i=0; i < height; i+=60) {
		rows.push(ArrowDown(move, width));
	}
	return (
		<div className = "downDisplay">
			{rows}
		</div>
	)
}