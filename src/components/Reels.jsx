import React, { useState, useEffect } from "react";

// Function to generate random symbols for the reels
const randomizeSymbols = () => {
  const symbols = ["🍒", "🍋", "🍇", "🔔", "⭐", "🍀"];

  return Array.from({ length: 5 }, () => {
    // 5 columns (reels)
    const dummySymbols = Array.from(
      { length: 25 },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    ); // 25 dummy symbols
    const finalSymbols = Array.from(
      { length: 3 },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    ); // 3 final symbols
    console.log(finalSymbols);
    return [...finalSymbols, ...dummySymbols]; // Combine dummy and final symbols
  });
};

const Reel = () => {
  const [reels, setReels] = useState([]);

  // Use useEffect to set the random symbols when the component mounts
  useEffect(() => {
    const symbols = randomizeSymbols();
    setReels(symbols);
  }, []);

  return (
    <div className="reel">
      {reels.map((colSymbols, colIndex) => (
        <div className="col" key={colIndex}>
          <div className="colData"
            style={{ animationDelay: `${colIndex * 0.5}s` }}>
            {colSymbols.map((symbol, symbolIndex) => (
              <span key={symbolIndex}>{symbol}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reel;
