import React from "react";
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import Statistics from "./pages/statistics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/statistics" element={<Statistics/>}/>
      </Routes>
    </Router>

  )
}

export default App;