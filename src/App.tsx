import React from 'react';
import logo from './logo.svg';
import "./App.scss"

const App = () => {
  return (
    <div className="App">
      <img src={logo} alt="logo" />
      <h1>Galaxieon Code</h1>
      <p>
        Code Editor Super Powered By{" "}
        <a
          href="http://galaxieon.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Galaxieon
        </a>
      </p>
    </div>
  );
};

export default App;
