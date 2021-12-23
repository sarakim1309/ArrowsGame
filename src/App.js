import './App.css';
import HomePage from './components/HomePage/HomePage.js';
import Game from './components/Game/Game.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="background">
      <Router>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/Game" element={<Game/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;