import React, { useEffect, useState, useRef } from "react";
import Reel from "./Reels";
import History from "./History";
import StatusNav from "./StatusNav";

const SlotMachine = () => {
  const [history, setHistory] = useState([]); // Manage the history state
  const reelRef = useRef(null); // Create a ref for the Reel component

  // Load history from local storage on component mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("slotHistory")) || [];
    setHistory(storedHistory);
  }, []);

  // Function to save history and store the latest 30 in local storage
  const saveHistory = (symbols) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, symbols];

      // Limit history to the latest 30 entries
      const limitedHistory = updatedHistory.slice(-30);

      // Save the updated history to local storage
      localStorage.setItem("slotHistory", JSON.stringify(limitedHistory));

      return limitedHistory;
    });
  };

  // Lever click handler
  const handleLeverClick = () => {
    if (reelRef.current) {
      reelRef.current.regenerateSymbols(); // Trigger regenerateSymbols in the Reel component
    }
  };

  return (
    <>
      <div className="slotMachine">
        <div className="lights leftLights">
          {Array.from({ length: 10 }, (_, index) => (
            <span
              key={index}
              className="light"
              style={{ animationDelay: `${index * 0.5}s` }}
            ></span>
          ))}
        </div>
        <div className="lights rightLights">
          {Array.from({ length: 10 }, (_, index) => (
            <span
              key={index}
              className="light"
              style={{ animationDelay: `${index * 0.1}s` }}
            ></span>
          ))}
        </div>

        <div className={`lever`} onClick={handleLeverClick}>
          <div className="rod">
            <div className="ball"></div>
          </div>
        </div>
        <Reel ref={reelRef} saveHistory={saveHistory} />

        <div className="cube-wrap">
          <div className="cube flex gap-1">
            <div>
              <div><span>Total Bet - </span> <input type="number" placeholder="10"/></div>
            <button>+</button>
            <button>-</button>
            <button>Max</button>
            </div>
            <button>Auto Spin</button>
            <div>
              <div><span>Total Auto Spin - </span> <input type="number" placeholder="10"/></div>
            <button>+</button>
            <button>-</button>
            <button>Max</button>
            </div>
          </div>
        </div>
      </div>

      <StatusNav>
        <History history={history} />
      </StatusNav>
    </>
  );
};

export default SlotMachine;
