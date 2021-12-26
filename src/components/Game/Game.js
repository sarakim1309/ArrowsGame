import {useEffect, useState, useRef, useReducer, React} from 'react'
import './Game.css';
import Right from '../Right/Right.js';
import Up from '../Up/Up.js';
import Left from '../Left/Left.js';
import Down from '../Down/Down.js';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
	savedCallback.current = callback;
  });
  useEffect(() => {
	function tick() {
	  savedCallback.current();
	}
	let id = setInterval(tick, delay);
	return () => clearInterval(id);
  }, [delay]);
}

export function Timer({pause}) {
  const [hour, setHours] = useState(0);
  const [minute, setMinutes] = useState(0);
  const [second, setSeconds] = useState(0);
  const toTime = (time) => ("0" + time).slice(-2);
  
  let resetRef = useRef();
  // Trick to Intialize countRef.current on first render only.
  resetRef.current = resetRef.current || false; 
  
  useEffect(() => {
	if (resetRef.current === true) {
	  setSeconds(0);
	}
  });
  
  useInterval(()=> {
	if (pause) {
	  resetRef.current = true;
	  return;
	}
	resetRef.current = false;
	setSeconds(second + 1);
  }, pause ? null : 1000);
  useInterval(()=> {
	if (pause) {
	   resetRef.current = true;
	   return;
	}
	resetRef.current = false;
	setSeconds(0);
	setMinutes(minute + 1);
  }, pause ? null : 1000 * 60);
  useInterval(()=> {
   if (pause) {
	   resetRef.current = true;
	   return;
	}  
	setSeconds(0);
	setMinutes(0);
	setHours(hour + 1);
  }, pause ? null :  1000 * 60 * 60);
  return (
	<div className="timer">
	  <span>TIME:</span> <span>{toTime(hour)}:</span>
	  <span>{toTime(minute)}:</span>
	  <span>{toTime(second)}</span>
	</div>
  );
}

function initState () {
	return {
		direction: 1,
		lost: 0,
		score: 0,
	}
}

export default function Game() {
	const [state, dispatch] = useReducer(reducer,initState()); 
	// console.log("state: ", state);
	let { direction, lost, score } = state;
	
	const nextMove = () => {
    	const dir = Math.floor(Math.random() * 4 + 1)
    	count = count + 1
    	return dir;
    }

    const drawDirection = () => {
    	if (state.direction === 1) {
    		return (
				<div> 
					 <Right/> 
				</div>
			)
			// suposedMove = Keys.Right
		} else if (state.direction === 2) {
    		console.log("Up")
    		return (
				<div> 
					 <Up/> 
				</div>
			)
			// suposedMove = Keys.Up
		} else if (state.direction === 3) {
    		return (
				<div> 
					 <Left/> 
				</div>
			)
			// suposedMove = Keys.Left
		} else if (state.direction === 4) {
    		return (
				<div> 
					 <Down/> 
				</div>
			)
			// suposedMove = Keys.Down
		}
    }

	useEffect(() => {
		gameLoop();  
	},[]);

	let interval = null;
	const UseTimeout = (fn, timeout) => {
		interval = setTimeout(fn, timeout);
	}

	let component = null
	let count = 0
	const gameLoop = () => {
		const nextState = {
			direction: nextMove(),
			lost: 0,
			score: count,
		}

		dispatch({
			type: 'update',
			newState: nextState
		});

		clearTimeout(interval);
		UseTimeout(gameLoop, 1000);
	}

	return (
		<div>
			{/*{Timer(true)}*/}
			<div>
				{drawDirection()}
			</div>
		</div>
	)
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'game_lost':
			return {
				...state,
				lost: true,
			}
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