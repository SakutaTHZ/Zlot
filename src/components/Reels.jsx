import React, { useState, useEffect } from "react";

// Define custom paylines (indices of symbols in the paylines)
const PAYLINES = [
  {
    name: "Top row",
    pattern: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
    multiplier: 10
  },
  {
    name: "Middle row",
    pattern: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],
    multiplier: 10
  },
  {
    name: "Bottom row",
    pattern: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]],
    multiplier: 10
  },

  // Diagonal payline patterns
  {
    name: "Diagonal (\\)",
    pattern: [[0, 0], [1, 1], [2, 2]],
    multiplier: 20
  },
  {
    name: "Diagonal (\\)",
    pattern: [[0, 1], [1, 2], [2, 3]],
    multiplier: 20
  },
  {
    name: "Diagonal (\\)",
    pattern: [[0, 2], [1, 3], [2, 4]],
    multiplier: 20
  },

  {
    name: "Diagonal (/)",
    pattern: [[0, 4], [1, 3], [2, 2]],
    multiplier: 20
  },
  {
    name: "Diagonal (/)",
    pattern: [[0, 3], [1, 2], [2, 1]],
    multiplier: 20
  },
  {
    name: "Diagonal (/)",
    pattern: [[0, 2], [1, 1], [2, 0]],
    multiplier: 20
  },

  // Cross patterns
  {
    name: "X (1)",
    pattern: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    multiplier: 15
  },
  {
    name: "X (2)",
    pattern: [[0, 1], [0, 3], [1, 2], [2, 1], [2, 3]],
    multiplier: 15
  },
  {
    name: "X (3)",
    pattern: [[0, 2], [0, 4], [1, 3], [2, 2], [2, 4]],
    multiplier: 15
  },

  // V pattern
  {
    name: "V pattern (1)",
    pattern: [[0, 0], [0, 4], [1, 1], [1, 3], [2, 2]],
    multiplier: 25
  },
  {
    name: "Reverse V pattern (2)",
    pattern: [[0, 2], [1, 1], [1, 3], [2, 0], [2, 4]],
    multiplier: 25
  },

  // X pattern
  {
    name: "+ (1)",
    pattern: [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]],
    multiplier: 30
  },
  {
    name: "+ pattern (2)",
    pattern: [[0, 2], [1, 1], [1, 2], [1, 3], [2, 2]],
    multiplier: 30
  },
  {
    name: "+ pattern (3)",
    pattern: [[0, 3], [1, 2], [1, 3], [1, 4], [2, 3]],
    multiplier: 30
  },
  
  // Column patterns
  {
    name: "Column 1",
    pattern: [[0, 0], [1, 0], [2, 0]],
    multiplier: 5
  },
  {
    name: "Column 2",
    pattern: [[0, 1], [1, 1], [2, 1]],
    multiplier: 5
  },
  {
    name: "Column 3",
    pattern: [[0, 2], [1, 2], [2, 2]],
    multiplier: 5
  },
  {
    name: "Column 4",
    pattern: [[0, 3], [1, 3], [2, 3]],
    multiplier: 5
  },
  {
    name: "Column 5",
    pattern: [[0, 4], [1, 4], [2, 4]],
    multiplier: 5
  },
];


const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

// Function to generate random symbols for the reels
const randomizeSymbols = () => {
  const symbols = ["🍒", "🍋", "🍇", "🔔", "⭐", "🍀"];
  
  return Array.from({ length: 5 }, () => {
    const finalSymbols = Array.from(
      { length: 3 },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    ); // 3 final symbols
    const dummySymbols = Array.from(
      { length: 25 },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    ); // 25 dummy symbols
    return [...finalSymbols, ...dummySymbols]; // Combine final and dummy symbols
  });
};

// Function to check for a win based on custom paylines
const checkWinCondition = (reels) => {
  const spinTime = getCurrentTime();
  const finalSymbols = reels.map((col) => col.slice(0, 3));
  console.log(finalSymbols)

  if (!Array.isArray(reels) || !Array.isArray(reels[0])) {
    console.error("Error: reels is not a valid 2D array");
    return { isWin: false, paylinesHit: [] };
  }

  let paylinesHit = [];
  let totalMultiplier = 0;

  PAYLINES.forEach(({pattern,name, multiplier} ,index) => {
    const symbolsInPayline = pattern.map(([row, col]) => finalSymbols[col][row]); // Extract symbols for this payline
    console.log(symbolsInPayline+" "+name)
    // Check if all symbols in the payline are the same
    if (symbolsInPayline.every(symbol => symbol === symbolsInPayline[0])) {
      paylinesHit.push({ symbol: symbolsInPayline[0], name, multiplier }); // Add the symbol that formed the winning payline
      totalMultiplier += multiplier; // Sum the multipliers for the winning paylines
    }
  });

  return {
    isWin: paylinesHit.length > 0, // Win if any paylines were hit
    paylinesHit, // Return the hit paylines
    totalMultiplier, // Return the total multiplier for winnings
    spinTime
  };
};

const Reel = ({ saveHistory }) => {
  const [reels, setReels] = useState(randomizeSymbols());
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to regenerate symbols and trigger animation
  const regenerateSymbols = () => {
    if (isAnimating) return; // Prevent any actions during animation

    setIsAnimating(false); // Reset animation state first
    const newSymbols = randomizeSymbols(); // Generate new symbols
    setReels(newSymbols);

    // Trigger animation after a short delay
    setTimeout(() => {
      setIsAnimating(true); // Start animation
    }, 50); // Small delay to reset animation state

    // End animation and save to history after 2.5 seconds
    setTimeout(() => {
      setIsAnimating(false); // Stop animation

      // Check for win conditions
      const { isWin, paylinesHit, totalMultiplier,spinTime  } = checkWinCondition(newSymbols); // Pass newSymbols

      // Save the result to history
      saveHistory({
        symbols: newSymbols,
        result: isWin ? "Win" : "Lose",
        paylinesHit,
        spinTime,
        totalMultiplier, // Save total multiplier for winnings
      });
    }, 2500); // Duration of the animation
  };

  // Listen for Spacebar press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent default Spacebar behavior (like scrolling)
        regenerateSymbols(); // Regenerate symbols when Spacebar is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAnimating]); // Depend on isAnimating to lock actions

  return (
    <div className="reel relative">
      <div className="reelGrid absolute flex flex-wrap box-border h-full w-full z-40">
        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>

        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>

        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>
        <div className="grid w-1/5 h-1/3 border"></div>
      </div>
      {reels.map((colSymbols, colIndex) => (
        <div
          className={`col ${isAnimating ? "animating" : ""}`}
          style={{ animationDelay: `${colIndex * 0.5}s` }}
          key={colIndex}
        >
          <div
            className={`colData ${isAnimating ? "animating" : ""}`}
            style={{ animationDelay: `${colIndex * 0.2}s` }}
          >
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
