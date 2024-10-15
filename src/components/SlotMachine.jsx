import Reel from "./Reels";

const SlotMachine = () => {
  return (
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

      <Reel/>
    </div>
  );
};

export default SlotMachine;
