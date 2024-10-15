import React, { useState, useEffect } from "react";

// Function to generate random symbols for the reels
const randomizeSymbols = () => {
  const symbols = ["🍒", "🍋", "🍇", "🔔", "⭐", "🍀"];
  
  return Array.from({ length: 5 }, () => {
    const dummySymbols = Array.from(
      { length: 25 },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    ); // 25 dummy symbols
    const finalSymbols = Array.from(
      { length: 3 },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    ); // 3 final symbols
    return [...finalSymbols, ...dummySymbols]; // Combine final and dummy symbols
  });
};

const Reel = ({ saveHistory }) => {
  const [reels, setReels] = useState(randomizeSymbols());
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to regenerate symbols and trigger animation
  const regenerateSymbols = () => {
    if (isAnimating) return;  // Prevent any actions during animation

    setIsAnimating(false);  // Reset animation state first
    const newSymbols = randomizeSymbols();  // Generate new symbols
    console.log(newSymbols);
    setReels(newSymbols);

    // Trigger animation after a short delay
    setTimeout(() => {
      setIsAnimating(true);  // Start animation
    }, 50);  // Small delay to reset animation state

    // End animation and save to history after 2.5 seconds
    setTimeout(() => {
      setIsAnimating(false); // Stop animation
      saveHistory(newSymbols); // Save the current symbols to history
    }, 2500);  // Duration of the animation
    console.log(newSymbols);
  };

  // Listen for Spacebar press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();  // Prevent default Spacebar behavior (like scrolling)
        regenerateSymbols();      // Regenerate symbols when Spacebar is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAnimating]);  // Depend on isAnimating to lock actions

  return (
    <div className="reel">
      {reels.map((colSymbols, colIndex) => (
        <div className="col" key={colIndex}>
          <div
            className={`colData ${isAnimating ? "animating" : ""}`}  // Add animation class when animating
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
