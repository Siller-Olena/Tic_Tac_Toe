import React, { useState } from 'react';
import './Board.css'; // Ensure the CSS is being imported

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null)); // State for the game board (9 squares, initially all empty)
  const [isXNext, setIsXNext] = useState(true); // State to track whose turn it is (true = 'X' is next, false = 'O' is next)
  const [winner, setWinner] = useState(null); // State to store the winner ('X', 'O', or null if the game is ongoing)
  const [leaderboard, setLeaderboard] = useState([]); // Store leaderboard names
  const [showLeaderboard, setShowLeaderboard] = useState(false); // For showing leaderboard modal
  const [playerName, setPlayerName] = useState(''); // Store player name input

  // Handle click event on a square
  const handleClick = (index) => {
    if (squares[index] || winner) return; // Ignore if square is already filled or if there's a winner

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';  // Place 'X' or 'O' on the board
    setSquares(newSquares);
    setIsXNext(!isXNext);  // Switch player

    // Check for a winner after updating the squares
    const currentWinner = calculateWinner(newSquares);  // Calculate winner after the move
    if (currentWinner) {
      setWinner(currentWinner);  // If there's a winner, set the winner
    }
  };

  // Function to calculate the winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return 'X' or 'O' if there's a winner
      }
    }
    return null;  // If no winner found, return null
  };

  // Handle starting a new game
  const handleNewGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  // Handle submitting the winner's name to leaderboard
  const handleSubmitName = () => {
    if (playerName && winner) {
      const newLeaderboard = [...leaderboard, { name: playerName, winner }];
      setLeaderboard(newLeaderboard);
      setPlayerName('');  // Reset player name input
      setShowLeaderboard(false);  // Close leaderboard after submitting
    }
  };

  // Toggle leaderboard modal
  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  // Render the board with squares
    const renderSquare = (index) => {

    return (

      <div

        className={`square ${squares[index] === 'X' ? 'x' : squares[index] === 'O' ? 'o' : ''}`}

        onClick={() => handleClick(index)}

      >

        {squares[index]}

      </div>

    );

  };
    return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <div className="buttons-container">
        <button onClick={handleNewGame}>Start New Game</button>
        <button onClick={toggleLeaderboard}>Show Leaderboard</button>
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="overlay">
          <div className="modal">
            <h2>Leaderboard</h2>
            <ul>
              {leaderboard.map((entry, index) => (
                <li key={index}>
                  {entry.name} - {entry.winner}
                </li>
              ))}
            </ul>
            <button onClick={toggleLeaderboard}>Close</button>
          </div>
        </div>
      )}

      {/* Name Input Modal for Winner */}
      {winner && (
        <div className="overlay">
          <div className="modal">
            <h2>{winner} Wins!</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={handleSubmitName}>Submit</button>
            <button onClick={handleNewGame}>New Game</button>
          </div>
        </div>
      )}
    </div>
  );

}
export default Game;
