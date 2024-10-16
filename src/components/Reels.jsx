import { useState, useEffect } from "react";
import ReelGrid from "./ReelGrid";

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
    name: "\\ Diagonal 1",
    pattern: [[0, 0], [1, 1], [2, 2]],
    multiplier: 20
  },
  {
    name: "\\ Diagonal 2",
    pattern: [[0, 1], [1, 2], [2, 3]],
    multiplier: 20
  },
  {
    name: "\\ Diagonal 3",
    pattern: [[0, 2], [1, 3], [2, 4]],
    multiplier: 20
  },

  { 
    name: "/ Diagonal 1",
    pattern: [[0, 4], [1, 3], [2, 2]],
    multiplier: 20
  },
  {
    name: "/ Diagonal 2",
    pattern: [[0, 3], [1, 2], [2, 1]],
    multiplier: 20
  },
  {
    name: "/ Diagonal 3",
    pattern: [[0, 2], [1, 1], [2, 0]],
    multiplier: 20
  },

  // Cross patterns
  {
    name: "X 1",
    pattern: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    multiplier: 15
  },
  {
    name: "X 2",
    pattern: [[0, 1], [0, 3], [1, 2], [2, 1], [2, 3]],
    multiplier: 15
  },
  {
    name: "X 3",
    pattern: [[0, 2], [0, 4], [1, 3], [2, 2], [2, 4]],
    multiplier: 15
  },

  // V pattern
  {
    name: "V",
    pattern: [[0, 0], [0, 4], [1, 1], [1, 3], [2, 2]],
    multiplier: 25
  },
  {
    name: "^",
    pattern: [[0, 2], [1, 1], [1, 3], [2, 0], [2, 4]],
    multiplier: 25
  },

  // X pattern
  {
    name: "+ 1",
    pattern: [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]],
    multiplier: 30
  },
  {
    name: "+ 2",
    pattern: [[0, 2], [1, 1], [1, 2], [1, 3], [2, 2]],
    multiplier: 30
  },
  {
    name: "+ 3",
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

//Pity count
const pityThreshold = 3;
// Function to generate random symbols for the reels
const randomizeSymbols = (failCount) => {
  const symbols = ["🍒", "🍋", "🍇", "🔔", "⭐", "🍀"];

  if (failCount >= pityThreshold+1) {
    console.log("Pity hit")
    // Pick a random payline to guarantee a win
    const randomPayline = PAYLINES[Math.floor(Math.random() * PAYLINES.length)];
    
    // Choose a random symbol for the winning payline
    const winningSymbol = symbols[Math.floor(Math.random() * symbols.length)];

    // Generate symbols, making sure the selected payline has the winning symbol
    return Array.from({ length: 5 }, (_, colIndex) => {
      return Array.from({ length: 3 }, (_, rowIndex) => {
        // Check if the current position is part of the winning payline
        const isWinningPosition = randomPayline.pattern.some(([row, col]) => row === rowIndex && col === colIndex);
        
        // If it's a winning position, set it to the winning symbol
        return isWinningPosition ? winningSymbol : symbols[Math.floor(Math.random() * symbols.length)];
      });
    });
  }

  // Otherwise, return random symbols
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

  if (!Array.isArray(reels) || !Array.isArray(reels[0])) {
    console.error("Error: reels is not a valid 2D array");
    return { isWin: false, paylinesHit: [] };
  }

  let paylinesHit = [];
  let gridPositions = []; // Store positions of winning symbols
  let totalMultiplier = 0;

  PAYLINES.forEach(({pattern,name, multiplier}) => {
    const symbolsInPayline = pattern.map(([row, col]) => finalSymbols[col][row]); // Extract symbols for this payline
    // Check if all symbols in the payline are the same
    if (symbolsInPayline.every(symbol => symbol === symbolsInPayline[0])) {
      paylinesHit.push({ symbol: symbolsInPayline[0], name, multiplier }); // Add the symbol that formed the winning payline
      totalMultiplier += multiplier; // Sum the multipliers for the winning paylines
      gridPositions.push(pattern); // Store the pattern for lighting
    }
  });

  return {
    isWin: paylinesHit.length > 0, // Win if any paylines were hit
    paylinesHit, // Return the hit paylines
    totalMultiplier, // Return the total multiplier for winnings
    spinTime,
    gridPositions, // Return the grid positions for winning paylines
  };
};

const Reel = ({ saveHistory }) => {
  const [failCount,setFailCount] = useState(1);
  const [reels, setReels] = useState(randomizeSymbols(failCount));
  const [isAnimating, setIsAnimating] = useState(false);
  const [winningGridPositions, setWinningGridPositions] = useState([]); // State for winning grid positions

  // Function to regenerate symbols and trigger animation
  const regenerateSymbols = () => {
    if (isAnimating) return; // Prevent any actions during animation
    setWinningGridPositions([]);
    setIsAnimating(false); // Reset animation state first
    const newSymbols = randomizeSymbols(failCount); // Generate new symbols
    setReels(newSymbols);

    // Trigger animation after a short delay
    setTimeout(() => {
      setIsAnimating(true); // Start animation
    }, 50); // Small delay to reset animation state

    // End animation and save to history after 2.5 seconds
    setTimeout(() => {
      setIsAnimating(false); // Stop animation

      // Check for win conditions
      const { isWin, paylinesHit,gridPositions, totalMultiplier,spinTime  } = checkWinCondition(newSymbols); // Pass newSymbols
      if (!isWin) {
        // Update failCount correctly
        setFailCount((prevCount) => prevCount + 1);
        console.log("Fail count - " + failCount); // This might still show an outdated value because state updates are async
      }else{
        setFailCount(1);
      }
      // Save the result to history
      saveHistory({
        symbols: newSymbols,
        result: isWin ? "Win" : "Lose",
        paylinesHit,
        spinTime,
        totalMultiplier, // Save total multiplier for winnings
      });
      // Set the winning grid positions for lighting up
      setWinningGridPositions(gridPositions);
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
      {/* Render the ReelGrid here */}
      <ReelGrid winningGridPositions={winningGridPositions} />

      {reels.map((colSymbols, colIndex) => (
        <div
          className={`z-20 col ${isAnimating ? "animating" : ""}`}
          style={{ animationDelay: `${colIndex * 0.5}s` }}
          key={colIndex}
        >
          <div
            className={`colData ${isAnimating ? "animating" : ""}`}
            style={{ animationDelay: `${colIndex * 0.2}s` }}
          >
            {colSymbols.map((symbol, symbolIndex) => (
              <span className="text-center drop-shadow-2xl" key={symbolIndex}>{symbol}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reel;
