import React, { useEffect, useState, useRef } from "react";
import Reel from "./Reels";
import History from "./History";
import StatusNav from "./StatusNav";
import { CgSpinner } from "react-icons/cg";

const SlotMachine = () => {
  const [history, setHistory] = useState([]); // Manage the history state
  const reelRef = useRef(null); // Create a ref for the Reel component

  const [autoSpinning, setAutoSpinning] = useState(false);
  const [totalSpinCount, setTotalSpinCount] = useState(11); // Tracks total spins
  const [spinCount, setSpinCount] = useState(0); // Tracks the current auto-spin count
  const intervalRef = useRef(null); // Use ref to store the interval ID

  // Function to start auto-spin
  const startAutoSpin = () => {
    {autoSpinning ? (
      setAutoSpinning(false)
    ):(
      setAutoSpinning(true)
    )}
    setSpinCount(0); // Reset the spin count when starting auto-spin
  };

  // Function to stop auto-spin
  const stopAutoSpin = () => {
    setAutoSpinning(false);
    clearInterval(intervalRef.current); // Clear the interval when stopping
    intervalRef.current = null;
  };

  // Function to handle auto-spin logic
  const handleAutoSpin = () => {
    intervalRef.current = setInterval(() => {
      handleLeverClick();

      setSpinCount((spinCount) => {
        // Stop auto-spin after a certain number of spins
        if (spinCount + 1 >= totalSpinCount) {
          stopAutoSpin();
          return 0; // Reset spin count when auto-spin stops
        }
        return spinCount + 1; // Increment spin count
      });
    }, 4000); // Spin every 4 seconds
  };

  // Function to add to total spin count
  const calculateTotalSpinCount = (amount) => {
    setTotalSpinCount((prevTotal) => prevTotal + amount);
  };

  // Log the updated totalSpinCount
  useEffect(() => {
    console.log("Total Spin Count updated:", totalSpinCount);
  }, [totalSpinCount]); // This will trigger whenever totalSpinCount changes

  useEffect(() => {
    if (autoSpinning) {
      console.log("Auto spinning started...");
      handleAutoSpin(); // Call the function to start auto-spinning
    }

    // Cleanup function to clear the interval if the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoSpinning]); // Depend only on autoSpinning to control the spinning

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
      //const limitedHistory = updatedHistory.slice(-30);

      // Save the updated history to local storage
      localStorage.setItem("slotHistory", JSON.stringify(updatedHistory));

      return updatedHistory;
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
      <div className="slotMachine scale-75 md:scale-100">
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
          <div className="dataBox bet-dataBox flex">
            <span className="text-white text-nowrap">Your Bet - </span>{" "}
            <input
              type="number"
              value={10}
              placeholder="10"
              className="bg-transparent w-full text-white px-2"
              onChange={(e) => setTotalSpinCount(Number(e.target.value))}
            />
          </div>
          <div className="dataBox spin-dataBox flex">
            <span className="text-white text-nowrap">Total Spin - </span>{" "}
            <input
              type="number"
              value={totalSpinCount}
              placeholder="10"
              className="bg-transparent w-full text-white px-2"
              onChange={(e) => setTotalSpinCount(Number(e.target.value))}
            />
          </div>
          <div className="cube flex justify-center items-center gap-5">
            <div className="betBox w-4/12 flex flex-col gap-1">
              <div className="flex justify-between gap-3 h-8">
                <button
                  className="flex justify-center items-center w-full"
                >
                  +
                </button>
                <button
                  className="flex justify-center items-center w-full"
                >
                  -
                </button>
              </div>
            </div>

            <button
              className="h-full w-32 flex justify-center items-center"
              onClick={startAutoSpin}
            >
              <span className={`${autoSpinning ? "hidden" : "block"}`}>
                Auto Spin
              </span>
              <span className={`absolute text-sm ${autoSpinning ? "block" : "hidden"}`}>
                {totalSpinCount-spinCount}
              </span>
              <span>
                <CgSpinner
                  size={50}
                  className={`animate-spin ${
                    autoSpinning ? "block" : "hidden"
                  }`}
                />
              </span>
            </button>

            <div className="spinBox w-4/12 flex flex-col gap-1">
              <div className="flex justify-between gap-3 h-8">
                <button className="flex justify-center items-center w-full"
                  onClick={() => calculateTotalSpinCount(1)}>
                  +
                </button>
                <button className="flex justify-center items-center w-full"
                  onClick={() => calculateTotalSpinCount(-1)}>
                  -
                </button>
              </div>
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
