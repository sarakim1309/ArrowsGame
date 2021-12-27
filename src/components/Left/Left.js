import React from 'react'
import './Left.css';
import ArrowLeft from './ArrowLeft.js';


export default function Left(move) {
	return (
		<div className = "leftDisplay">
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
			{ArrowLeft(move)}
		</div>
	)
}