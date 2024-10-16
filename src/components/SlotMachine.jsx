import React, { useState } from "react";
import Reel from "./Reels";
import History from "./History";
import StatusNav from "./StatusNav";

const SlotMachine = () => {
  const [history, setHistory] = useState([]); // Manage the history state

  // Function to save history
  const saveHistory = (symbols) => {
    setHistory((prevHistory) => [...prevHistory, symbols]);
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

        <div className="lever">
          <div className="rod">
            <div className="ball"></div>
          </div>
        </div>
        <Reel saveHistory={saveHistory} />
      </div>

      <StatusNav>
        <History history={history} />
      </StatusNav>
    </>
  );
};

export default SlotMachine;
