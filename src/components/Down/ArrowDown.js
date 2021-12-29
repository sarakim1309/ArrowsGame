import React from 'react'
import './ArrowDown.css';

export default function ArrowDown(style, width) {
	var rows = [];
	for (var i=0; i < width; i+=50) {
		rows.push(<span></span>);
	}
	return (
		<div>
			<div className={style}>
				{rows}
			</div>
		</div>
	)
}