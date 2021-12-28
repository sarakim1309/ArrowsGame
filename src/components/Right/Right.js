import React from 'react'
import './Right.css';
import ArrowRight from './ArrowRight.js';


export default function Right(move) {
	return (
		<div className = "rightDisplay">
			{ArrowRight(move)}
			{ArrowRight(move)}
			{ArrowRight(move)}
			{ArrowRight(move)}
			{ArrowRight(move)}
			{ArrowRight(move)}
			{ArrowRight(move)}
			{ArrowRight(move)}
		</div>
	)
}