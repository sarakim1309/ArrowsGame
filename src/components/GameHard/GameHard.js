import {useEffect, useState, useRef, useReducer, React} from 'react'
import { useNavigate } from "react-router-dom";
import '../Game/Game.css';
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
			// console.log('update state', action.newState); 
			return {
				...state,
				...action.newState
			}
		case 'restart':
			// console.log('update state', state); 
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
		UseTimeout(gameLoop, 1000);
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
		UseTimeout(gameLoop, 1000);
	}

	let dir = 1;
	const nextMove = () => {
		dir = Math.floor(Math.random() * 4 + 1)
		return dir;
	}

	let r = 1;
	let prevColor = 1;
	const nextColor = () => {
		r = Math.floor(Math.random() * 3 + 1)
		if (prevColor === 3) {
			r = Math.floor(Math.random() * 2 + 1)	
		}
		prevColor = r
		return r;
	}

	let lostState = false
	let actionMade = false
	const handleKey = (e) => {
		if(r !== 3) {
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
		move = Math.floor(Math.random() * 3)
		let move2 = Math.floor(Math.random() * 3)
		//COLOR GREEN
		if(state.color === 1) {
			component = Dir[state.direction - 1] + " green " + Move[move] + "2"
		// COLOR ORANGE
		} else if(state.color === 2) {
			component = Dir[move] + " orange " + Move[state.direction - 1] + "2"
		//COLOR RED
		} else if(state.color === 3) {
			component = Dir[move] + " red " + Move[move2] + "2"
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
			{ !state.lost && drawDirection() }
		</div>
	)
}