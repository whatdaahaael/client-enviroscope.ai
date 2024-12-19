import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScatterPlot3D from './graph';
import Home from './home'
import Combination from './combinations';
function App() {
  

  return (
    <>
    <Router>
          <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<ScatterPlot3D />} />
        <Route path="/combinations" element={<Combination />} />
        
      </Routes>
    </Router>

    </>
  )
}

export default App
