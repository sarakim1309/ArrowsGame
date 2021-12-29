import React from 'react'
import './Left.css';
import ArrowLeft from './ArrowLeft.js';

export default function Left(move, height, width) {
	var rows = [];
	for (var i=0; i < height; i+=60) {
		rows.push(ArrowLeft(move, width));
	}
	return (
		<div className = "leftDisplay">
			{rows}
		</div>
	)
}