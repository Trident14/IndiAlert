import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '../src/component/NavBar';
import Home from '../src/component/Home';
import FlightTable from '../src/component/FlightTable';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<FlightTable />} />
      </Routes>
    </Router>
  );
};

export default App;
