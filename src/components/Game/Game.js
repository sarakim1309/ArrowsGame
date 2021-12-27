import {useEffect, useState, useRef, useReducer, React} from 'react'
import { useNavigate } from "react-router-dom";
import './Game.css';
import Right from '../Right/Right.js';
import Up from '../Up/Up.js';
import Left from '../Left/Left.js';
import Down from '../Down/Down.js';

function initState () {
	return {
		react: 1,
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
	// console.log("state: ", state);
	
	let { direction, lost, score } = state;
	
	let interval = null;
	const UseTimeout = (fn, timeout) => {
		interval = setTimeout(fn, timeout);
	}

	useEffect(() => {
		UseTimeout(gameLoop, 1000);
		document.addEventListener('keydown', handleKey);
		return function cleanup() {
			document.removeEventListener('keydown', handleKey);
		}
	},[]);

	let component = null
	let count = 0
	const gameLoop = () => {
		const nextState = {
			react: 1, //nextReact(),
			direction: nextMove(),
			lost: false,
			score: count,
		}

		dispatch({
			type: 'update',
			newState: nextState
		});

		clearTimeout(interval);
		if(!actionMade) {
			dispatch({type:'game_lost'});
			return;
		}
		actionMade = false
		UseTimeout(gameLoop, 1000);
	}

	let dir = 1;
	const nextMove = () => {
		dir = Math.floor(Math.random() * 4 + 1)
		return dir;
	}

	let r = 1;
	const nextReact = () => {
		r = Math.floor(Math.random() * 3 + 1)
		return r;
	}

	let lostState = false
	let actionMade = false
	const handleKey = (e) => {
		if (dir === 3 && (e.which !== Keys.Left && e.which !== Keys.a)) {  // left /a
			lostState = true
		}
		else if (dir === 1 && (e.which !== Keys.Right && e.which !== Keys.d)) {  // right /d
			lostState = true
		}
		else if (dir === 2 && (e.which !== Keys.Up && e.which !== Keys.w)) {  // up /w
			lostState = true
		}
		else if (dir === 4 && (e.which !== Keys.Down && e.which !== Keys.s)) {  // down /s
			lostState = true
		}
		if (lostState) {
			clearTimeout(interval);
			dispatch({type:'game_lost'});
		} else {
			count = count + 1
			actionMade = true
		}
	}

	let move = 0
	const drawDirection = () => {
		if(state.react === 1) {
			if (state.direction === 1) {
				if(state.score < 5) {
					component = Right("rightRight")
				} else {
					move = Math.floor(Math.random() * 4 + 1)
					if(move === 1) {
						component = Right("rightRight")
					} else if (move === 2) {
						component = Right("rightLeft")
					} else if (move === 3) {
						component = Right("rightUp")
					} else if (move === 4) {
						component = Right("rightDown")
					}
				}
			} else if (state.direction === 2) {
				if(state.score < 5) {
					component = Up("upUp")
				} else {
					move = Math.floor(Math.random() * 4 + 1)
					if(move === 1) {
						component = Up("upUp")
					} else if (move === 2) {
						component = Up("upLeft")
					} else if (move === 3) {
						component = Up("upRight")
					} else if (move === 4) {
						component = Up("upDown")
					}
				} 
			} else if (state.direction === 3) {
				if(state.score < 5) {
					component = Left("leftLeft")
				} else {
					move = Math.floor(Math.random() * 4 + 1)
					if(move === 1) {
						component = Left("leftLeft")
					} else if (move === 2) {
						component = Left("leftRight")
					} else if (move === 3) {
						component = Left("leftDown")
					} else if (move === 4) {
						component = Left("leftUp")
					}
				} 
			} else if (state.direction === 4) {
				if(state.score < 5) {
					component = Down("downDown")
				} else {
					move = Math.floor(Math.random() * 4 + 1)
					if(move === 1) {
						component = Down("downDown")
					} else if (move === 2) {
						component = Down("downLeft")
					} else if (move === 3) {
						component = Down("downUp")
					} else if (move === 4) {
						component = Down("downRight")
					}
				} 
			}
		}
		return (
			<div> {component} </div>
			// <div> {Right("rightUp")} </div>
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
			{drawDirection()}
		</div>
	)
}