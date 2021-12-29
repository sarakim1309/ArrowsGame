import {useEffect, useState, useRef, useReducer, React} from 'react'
import { useNavigate } from "react-router-dom";
import './Game.css';
import Right from '../Right/Right.js';
import Up from '../Up/Up.js';
import Left from '../Left/Left.js';
import Down from '../Down/Down.js';
import useWindowDimensions from '../Dimensions.js'

function initState () {
	return {
		color: 1,
		direction: 1,
		lost: false,
		score: 0,
	}
}

const Keys = {
  Space: 32,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  a: 65,  // left
  w: 87,  // up
  s: 83,  // down
  d: 68   // right
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'game_lost':
			return ({
				...state,
				lost: true,
				direction: 0,
			})
		case 'update':
			// console.log('update state', action.newState); 
			return {
				...state,
				...action.newState
			}
		default: {
			return state;
		}
	}
}

export default function Game() {
	const [state, dispatch] = useReducer(reducer,initState()); 
	let { direction, lost, score } = state;
	// console.log("state: ", state);
	
	let interval = null;
	const UseTimeout = (fn, timeout) => {
		interval = setTimeout(fn, timeout);
	}

	useEffect(() => {
		UseTimeout(gameLoop, 1500);
		document.addEventListener('keydown', handleKey);
		return function cleanup() {
			document.removeEventListener('keydown', handleKey);
		}
	},[]);

	let component = null
	let count = 0
	let nextState = null
	const gameLoop = () => {
		let lastR = 0;
		lastR = r
		nextState = {
			color: nextColor(),
			direction: nextMove(),
			lost: false,
			score: count,
		}

		dispatch({
			type: 'update',
			newState: nextState
		});

		clearTimeout(interval);
		if((!actionMade && lastR !== 3) || (actionMade && lastR === 3)) {
			dispatch({type:'game_lost'});
			return;
		}
		actionMade = false
		UseTimeout(gameLoop, 1500);
	}

	let dir = 1;
	const nextMove = () => {
		dir = Math.floor(Math.random() * 4 + 1)
		return dir;
	}

	let r = 1;
	const nextColor = () => {
		if(count > 15) {
			r = Math.floor(Math.random() * 3 + 1)
		} else if(count > 8) {
			r = Math.floor(Math.random() * 2 + 1)
		} else {
			r = 1
		}
		return r;
	}

	let lostState = false
	let actionMade = false
	const handleKey = (e) => {
		if(r !== 3) {
			if (dir === 3 && (e.which !== Keys.Left && e.which !== Keys.a)) {
				lostState = true
			}
			else if (dir === 1 && (e.which !== Keys.Right && e.which !== Keys.d)) {
				lostState = true
			}
			else if (dir === 2 && (e.which !== Keys.Up && e.which !== Keys.w)) {
				lostState = true
			}
			else if (dir === 4 && (e.which !== Keys.Down && e.which !== Keys.s)) {
				lostState = true
			}
		}
		if (lostState || r === 3) {
			clearTimeout(interval);
			dispatch({type:'game_lost'});
		} 
		count = count + 1
		actionMade = true
	}

	let move = 0
	const { height, width } = useWindowDimensions();
	const drawDirection = () => {
		//COLOR VERDE
		if(state.color === 1) {
			if (state.direction === 1) {
				if(state.score < 5) { component = Right("right rRight", height, width) } 
				else {
					move = Math.floor(Math.random() * 4 + 1)
					if(move === 1) { component = Right("right rRight", height, width) } 
					else if (move === 2) { component = Right("right rLeft", height, width) }
					else if (move === 3) { component = Right("right rUp", height, width) } 
					else if (move === 4) { component = Right("right rDown", height, width)	}
				}
			} else if (state.direction === 2) {
				if(state.score < 5) { component = Up("up uUp", height, width) } 
				else {
					move = Math.floor(Math.random() * 4 + 1)
					if(move === 1) { component = Up("up uUp", height, width) } 
					else if (move === 2) { component = Up("up uLeft", height, width) } 
					else if (move === 3) { component = Up("up uRight", height, width) } 
					else if (move === 4) { component = Up("up uDown", height, width) }
				} 
			} else if (state.direction === 3) {
				if(state.score < 5) { component = Left("left lLeft", height, width) } 
				else {
					move = Math.floor(Math.random() * 4 + 1)
					if(move === 1) { component = Left("left lLeft", height, width) } 
					else if (move === 2) { component = Left("left rRight", height, width) } 
					else if (move === 3) { component = Left("left dDown", height, width) } 
					else if (move === 4) { component = Left("left uUp", height, width) }
				} 
			} else if (state.direction === 4) {
				if(state.score < 5) { component = Down("down dDown", height, width) } 
				else {
					move = Math.floor(Math.random() * 4 + 1)
					if(move === 1) { component = Down("down dDown", height, width) } 
					else if (move === 2) { component = Down("down dLeft", height, width) } 
					else if (move === 3) { component = Down("down dUp", height, width) } 
					else if (move === 4) { component = Down("down dRight", height, width) }
				} 
			}
		// COLOR NARANJA
		} else if(state.color === 2) {
			if (state.direction === 1) {
				move = Math.floor(Math.random() * 4 + 1)
				if(move === 1) { component = Right("right2 rRight", height, width) } 
				else if (move === 2) { component = Left("left2 lRight", height, width) } 
				else if (move === 3) { component = Up("up2 uRight", height, width) } 
				else if (move === 4) { component = Down("down2 dRight", height, width) }
			} else if (state.direction === 2) {
				move = Math.floor(Math.random() * 4 + 1)
				if(move === 1) { component = Up("up2 uUp", height, width) } 
				else if (move === 2) { component = Left("left2 lUp", height, width) } 
				else if (move === 3) { component = Right("right2 rUp", height, width) } 
				else if (move === 4) { component = Down("down2 dUp", height, width) } 
			} else if (state.direction === 3) {
				move = Math.floor(Math.random() * 4 + 1)
				if(move === 1) { component = Left("left2 lLeft", height, width) } 
				else if (move === 2) { component = Right("right2 rLeft", height, width) } 
				else if (move === 3) { component = Down("down2 dLeft", height, width) } 
				else if (move === 4) { component = Up("up2 uLeft", height, width) } 
			} else if (state.direction === 4) {
				move = Math.floor(Math.random() * 4 + 1)
				if(move === 1) { component = Down("down2 dDown", height, width) } 
				else if (move === 2) { component = Left("left2 lDown", height, width) } 
				else if (move === 3) { component = Up("up2 uDown", height, width) } 
				else if (move === 4) { component = Right("right2 rDown", height, width) }
			}
		//COLOR ROJO
		} else if(state.color === 3) {
			move = Math.floor(Math.random() * 4 + 1)
			if (move === 1) { component = Right("right3 rRight", height, width)} 
			else if (move === 2) { component = Up("up3 uUp", height, width)} 
			else if (move === 3) { component = Left("left3 lLeft", height, width)} 
			else if (move === 4) { component = Down("down3 dDown", height, width)}
		}
		return (
			<div> {component} </div>
			// <div> {Down("down dDown", height, width)} </div>
		)
	}

	return (
		<div>
			<div className="info"> 
				<h4 className="score">SCORE: {state.score} </h4>
			</div>
			{state.lost && 
			<div className="game-lost">
				You lost🤡️!
			</div>}
			{ drawDirection() }
		</div>
	)
}