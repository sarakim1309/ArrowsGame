import {useEffect, useState, useRef, useReducer, React} from 'react'
import { useNavigate } from "react-router-dom";
import './Game.css';
import Right from '../Right/Right.js';
import Up from '../Up/Up.js';
import Left from '../Left/Left.js';
import Down from '../Down/Down.js';

function initState () {
	return {
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
			console.log('update state', action.newState); 
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
	console.log("state: ", state);
	
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

	const drawDirection = () => {
		if (state.direction === 1) {
			return (
				component = <Right/> 
			)
		} else if (state.direction === 2) {
			return (
				component = <Up/> 
			)
		} else if (state.direction === 3) {
			return (
				component = <Left/> 
			)
		} else if (state.direction === 4) {
			component = <Down/> 
		}
		return (
			<div> {component} </div>
		)
	}

	return (
		<div>
		    <div className="info"> 
        		<h4 className="score">SCORE: {state.score} </h4>
     	 	</div>
     	 	{console.log(state.lost)}
     	 	{state.lost && 
            <div className="game-lost">
              You lost🤡️!
            </div>}
			{drawDirection()}
		</div>
	)
}