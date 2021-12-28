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
		console.log("gameLoop", actionMade, r, state.react)
		let lastR = 0;
		lastR = r
		// console.log(state.score)
		nextState = {
			react: nextReact(),
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
		console.log("nextMove", actionMade, r, state.react)
		dir = Math.floor(Math.random() * 4 + 1)
		return dir;
	}

	let r = 1;
	const nextReact = () => {
		console.log("nextReact", actionMade, r, state.react)
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
		console.log("handleKey", actionMade, r, state.react)
		if(r !== 3) {
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
				// console.log(dir, e.which)
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
	const drawDirection = () => {
		console.log("drawDirection", actionMade, r, state.react)
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
		// COLOR 2
		} else if(state.react === 2) {
			if (state.direction === 1) {
				move = Math.floor(Math.random() * 4 + 1)
				if(move === 1) {
					component = Right("rightRight2")
				} else if (move === 2) {
					component = Left("leftRight2")
				} else if (move === 3) {
					component = Up("upRight2")
				} else if (move === 4) {
					component = Down("downRight2")
				}
			} else if (state.direction === 2) {
				move = Math.floor(Math.random() * 4 + 1)
				if(move === 1) {
					component = Up("upUp2")
				} else if (move === 2) {
					component = Left("leftUp2")
				} else if (move === 3) {
					component = Right("rightUp2")
				} else if (move === 4) {
					component = Down("downUp2")
				} 
			} else if (state.direction === 3) {
				move = Math.floor(Math.random() * 4 + 1)
				if(move === 1) {
					component = Left("leftLeft2")
				} else if (move === 2) {
					component = Right("rightLeft2")
				} else if (move === 3) {
					component = Down("downLeft2")
				} else if (move === 4) {
					component = Up("upLeft2")
				} 
			} else if (state.direction === 4) {
				move = Math.floor(Math.random() * 4 + 1)
				if(move === 1) {
					component = Down("downDown2")
				} else if (move === 2) {
					component = Left("leftDown2")
				} else if (move === 3) {
					component = Up("upDown2")
				} else if (move === 4) {
					component = Right("rightDown2")
				} 
			}
		} else if(state.react === 3) {
			if (state.react === 1) {
				component = Right("rightRight3")
			} else if (state.react === 2) {
				component = Up("upUp3")
			} else if (state.react === 3) {
				component = Left("leftLeft3")
			} else if (state.react === 4) {
				component = Down("downDown3")
			}
		}
		return (
			// <div> {component} </div>
			<div> {Down("downDown")} </div>
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