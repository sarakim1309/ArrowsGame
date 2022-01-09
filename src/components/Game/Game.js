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

const Move = [ "Right", "Up", "Left", "Down"]

const Dir = ["right", "up", "left", "down"]

const Color = [" green ", " orange ", " red "]

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
			console.log(action.newState)
			return {
				...state,
				...action.newState
			}
		case 'restart':
		
			return {
				...state,
				lost: false,
				color: 1,
				direction: 1,
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
	const [speed, setSpeed] = useState(1500);

	useEffect(() => {
		setSpeed(1500)
		UseTimeout(gameLoop, speed);
		document.addEventListener('keydown', handleKey);
		return function cleanup() {
			document.removeEventListener('keydown', handleKey);
		}
	},[]);

	let move = 0
	const { height, width } = useWindowDimensions();
	const drawDirection = () => {
		move = Math.floor(Math.random() * 3)
		let move2 = Math.floor(Math.random() * 3)
		if (state.score <= 5){
			component = Dir[state.direction -1] + " green " + Move[state.direction -1]
		// } else if (state.score >= 20) {
		// 	if(state.color === 1) {
		// 		component = Dir[state.direction -1] + Color[state.color -1] + Move[move] + "2"
		// 	} else {
		// 		component = Dir[move] + Color[state.color -1] + Move[state.direction -1] + "2"
		// 	}
		// } else if (state.score >= 15) {
		// 	if(state.color === 1) {
		// 		component = Dir[state.direction -1] + Color[state.color -1] + Move[move] + "1"
		// 	} else {
		// 		component = Dir[move] + Color[state.color -1] + Move[state.direction -1] + "1"
		// 	}
		} else {
			if(state.color === 1) {
				component = Dir[state.direction -1] + Color[state.color -1] + Move[move]
			} else {
				component = Dir[move] + Color[state.color -1] + Move[state.direction -1]
			}
		}
		if (!state.lost) {
			return (
				<div> {Arrows("arrows "+ component, height, width)} </div>
				// <div> {Arrows("arrow up green Up", height, width)} </div>
			)
		}
	}

	let interval = null;
	const UseTimeout = (fn, timeout) => {
		interval = setTimeout(fn.bind(null), timeout);
	}

	let lostState = false
	let actionMade = false
	const handleKey = (e) => {
		if(c !== 3) {
			if (dir === 1 && (e.which !== Keys.Right && e.which !== Keys.d)) {
				lostState = true
			} else if (dir === 2 && (e.which !== Keys.Up && e.which !== Keys.w)) {
				lostState = true
			} else if (dir === 3 && (e.which !== Keys.Left && e.which !== Keys.a)) {
				lostState = true
			} else if (dir === 4 && (e.which !== Keys.Down && e.which !== Keys.s)) {
				lostState = true
			}
		}
		if (lostState || c === 3) {
			clearTimeout(interval);
			dispatch({type:'game_lost'});
			return;
		} 
		actionMade = true
	}

	let count = 0
	let component = null
	let nextState = null
	const gameLoop = () => {
		console.log("gameLoop ", state.direction)
		let lastR = 0;
		lastR = c
		if((!actionMade && lastR !== 3) || (actionMade && lastR === 3)) {
			dispatch({type:'game_lost'});
			return;
		}
		count = count + 1
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
		interval = 0;

		// if(count === 14) {
		// 	setSpeed(1250)
		// } if(count === 19) {
		// 	setSpeed(1000)
		// }

		actionMade = false
		UseTimeout(gameLoop, speed);
	}

	let c = 1;
	const nextColor = () => {
		if(count > 15) {
			c = Math.floor(Math.random() * 3 + 1)
		} else if(count > 10) {
			c = Math.floor(Math.random() * 2 + 1)
		} else {
			c = 1
		}
		return c;
	}

	let dir = 1;
	const nextMove = () => {
		dir = Math.floor(Math.random() * 4 + 1)
		return dir;
	}

  const navigate = useNavigate();
  const goHome = () => {
    navigate("../");
  }

  const restart = () => {
  	const {lost} = state;
  	if (lost) {
		  dispatch({type:'restart'});
  		setSpeed(1500);
    	UseTimeout(gameLoop, speed);
  	}
  }

	return (
		<div>
			<div className="info"> 
				<h4 className="score">SCORE: {state.score} </h4>
			</div>
			{state.lost && 
			<div>
				<div className="game-lost">
					You lost🤡️!
				</div> 
				<div className="lost-buttons">
					<button className="btn btn-info btn-lg goHome" 
					onClick={goHome}>Go back</button> 
				</div> 
			</div>}
			{ !state.lost && drawDirection()}
		</div>
	)
}

// <button className="btn btn-info btn-lg goHome" type="reset"
// 					onClick={restart}>Loose again</button>

  // const tryAgain = () => {
  //  if(state.lost) {
  //    lostState = false;
  //     console.log('restarting: ->', state.lost);
  //     dispatch({type:'restart'});
  //     console.log('restarting: <-', state.lost);
  //    UseTimeout(gameLoop, 1500);
  //  }
  // }