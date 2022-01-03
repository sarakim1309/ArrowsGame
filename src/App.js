import './App.css';
import HomePage from './components/HomePage/HomePage.js';
import Game from './components/Game/Game.js';
import GameHard from './components/GameHard/GameHard.js';
import Rules from './components/Rules/Rules.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="background">
      <Router>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/Game" element={<Game/>}/>
            <Route exact path="/GameHard" element={<GameHard/>}/>
            <Route exact path="/Rules" element={<Rules/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;