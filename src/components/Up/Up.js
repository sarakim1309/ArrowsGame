import React from 'react'
import './Up.css';
import ArrowUp from './ArrowUp.js';


export default function Up(move) {
	return (
		<div className = "upDisplay">
			{ArrowUp(move)}
			{ArrowUp(move)}
			{ArrowUp(move)}
			{ArrowUp(move)}
			{ArrowUp(move)}
			{ArrowUp(move)}
			{ArrowUp(move)}
			{ArrowUp(move)}
			{ArrowUp(move)}
			{ArrowUp(move)}
			{ArrowUp(move)}
			{ArrowUp(move)}
		</div>
	)
}