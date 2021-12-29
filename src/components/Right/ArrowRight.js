import React from 'react'
import './ArrowRight.css';

export default function ArrowRight(style, width) {
	var rows = [];
	for (var i=0; i < width; i+=50) {
		rows.push(<span></span>);
	}
	return (
		<div className={style}>
			{rows}
		</div>
	)
}