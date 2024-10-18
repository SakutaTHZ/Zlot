import { useState, useEffect } from "react";
import { MdKeyboardTab, MdClose } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";

const ProfileNav = ({ children }) => {
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
    <div
      className={`profileNav ${
        isClosed ? "closed" : ""
      } fixed right-0 top-0 w-full md:w-96 h-screen z-50`}
    >
      {/* Render children (History component) */}
      <div className="history-container h-full px-5 overflow-y-scroll">
        {children}
      </div>
      <p className="flex gap-1 items-center hintText fixed bottom-1 left-1 ">
        <MdKeyboardTab /> Press Tab to See Stats
      </p>
      <div className="tab">
        <span
          className="cursor-pointer"
          onClick={() => setIsClosed((prev) => !prev)}
        >
          {isClosed ? <TbSettings2  size={25} /> : <MdClose size={25} />}
        </span>
      </div>
    </div>
  );
};

export default ProfileNav;
