import {useEffect, useState, useRef, useReducer, React} from 'react'
import { useNavigate } from "react-router-dom";
import './Game.css';
import Arrows from '../Arrows/Arrows.js';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
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

const Move = [ "Right", "Up", "Left", "Down" ]

const Dir = ["right", "up", "left", "down"]

function initState () {
	return {
		color: 1,
		direction: 1,
		lost: false,
		score: 0,
	}
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
		case 'restart':
			console.log('update state', state); 
			return {
				...state,
				color: 1,
				direction: 3,
				lost: false,
				score: 0,
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
		if(count > 20) {
			UseTimeout(gameLoop, 1000);
		} else if(count > 15) {
			UseTimeout(gameLoop, 1250);
		} else {
			UseTimeout(gameLoop, 1500);
		}
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
		console.log(state.lost)
		move = Math.floor(Math.random() * 3)
		let move2 = Math.floor(Math.random() * 3)
		//COLOR GREEN
		if(state.color === 1) {
			if (state.direction === 1) {
				if(state.score < 4) {
					component = "right green Right"
				} else {
					component = "right green " + Move[move]
				}
			} else if (state.direction === 2) {
				if(state.score < 4) {
					component = "up green Up" 
				} else {
					component = "up green " + Move[move] 
				}
			} else if (state.direction === 3) {
				if(state.score < 4) {
					component = "left green Left"
				} else {
					component = "left green " + Move[move]
				}
			} else if (state.direction === 4) {
				if(state.score < 4) {
					component = "down green Down" 
				} else {
					component = "down green " + Move[move]
				}
			}
		// COLOR ORANGE
		} else if(state.color === 2) {
			if (state.direction === 1) {
				component = Dir[move] + " orange Right" 
			} else if (state.direction === 2) {
				component = Dir[move] + " orange Up" 
			} else if (state.direction === 3) {
				component = Dir[move] + " orange Left" 
			} else if (state.direction === 4) {
				component = Dir[move] + " orange Down" 
			}
		//COLOR RED
		} else if(state.color === 3) {
			if (move === 1) { 
				component = "right red" + Move[move2]
			} else if (move === 2) { 
				component = "up red" + Move[move2]
			} else if (move === 3) { 
				component = "left red" + Move[move2]
			} else if (move === 4) { 
				component = "down red" + Move[move2]
			}
		}
		return (
			<div> {Arrows("arrows "+ component, height, width)} </div>
			// <div> {Arrows("arrow up green Up", height, width)} </div>
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

{/*<button type="button" className="btn btn-primary btn-lg tryAgain" onClick={tryAgain}>Go Back</button>*/}
	// const tryAgain = () => {
	// 	if(state.lost) {
	// 		lostState = false;
	//     console.log('restarting: ->', state.lost);
	//     dispatch({type:'restart'});
	//     console.log('restarting: <-', state.lost);
	// 		UseTimeout(gameLoop, 1500);
	// 	}
	// }
