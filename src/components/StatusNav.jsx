import { useState, useEffect } from "react";
import { MdKeyboardTab } from "react-icons/md";

const StatusNav = ({children}) => {
  const [isClosed, setIsClosed] = useState(true); 

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        setIsClosed((prev) => !prev); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={`statusNav ${isClosed ? "closed" : ""} fixed left-0 top-0 w-full md:w-96 h-screen bg-neutral-800 shadow-md z-50`}>
        {/* Render children (History component) */}
      <div className="history-container h-full px-5 overflow-y-scroll">
        {children}
      </div>
      <p className="flex gap-1 items-center hintText fixed bottom-1 left-1 ">
        <MdKeyboardTab /> Press Tab to See Stats
      </p>
    </div>
  );
};

export default StatusNav;
