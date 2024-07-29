import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Global.css';


const Home = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Flight Tracker</h1>
      <p>Find your flight status quickly and easily.</p>
      <Link to="/flights">
        <button className="check-button">Check</button>
      </Link>
    </div>
  );
};

export default Home;
