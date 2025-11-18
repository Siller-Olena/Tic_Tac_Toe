

// 1. Import the React library

import React from 'react';

// 2. Import the main game component

import Game from './components/Game'; 

// 3. Importing styles

import './App.css'; 

// 4. Defining the functional component App


const App = () => {
  // 5. Returning the structure (JSX)
  
  return (
    // 6. Main application container
    
    <div className="app">
      {/* 7. Embedding the Game component */}
     
      <Game />
    </div>
  );
};

// 8. Export the component

export default App;