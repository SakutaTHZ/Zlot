import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReelGrid from "./ReelGrid";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import confetti from "canvas-confetti";
import MessageBox from "./MessageBox";

const PAYLINES = [
  {
    name: "Top row",
    pattern: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
    multiplier: 5,
  },
  {
    name: "Middle row",
    pattern: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ],
    multiplier: 5,
  },
  {
    name: "Bottom row",
    pattern: [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
    ],
    multiplier: 5,
  },

  {
    name: "\\ Diagonal 1",
    pattern: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    multiplier: 3,
  },
  {
    name: "\\ Diagonal 2",
    pattern: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
    multiplier: 3,
  },
  {
    name: "\\ Diagonal 3",
    pattern: [
      [0, 2],
      [1, 3],
      [2, 4],
    ],
    multiplier: 3,
  },

  {
    name: "/ Diagonal 1",
    pattern: [
      [0, 4],
      [1, 3],
      [2, 2],
    ],
    multiplier: 3,
  },
  {
    name: "/ Diagonal 2",
    pattern: [
      [0, 3],
      [1, 2],
      [2, 1],
    ],
    multiplier: 3,
  },
  {
    name: "/ Diagonal 3",
    pattern: [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
    multiplier: 3,
  },

  {
    name: "X 1",
    pattern: [
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2],
    ],
    multiplier: 10,
  },
  {
    name: "X 2",
    pattern: [
      [0, 1],
      [0, 3],
      [1, 2],
      [2, 1],
      [2, 3],
    ],
    multiplier: 10,
  },
  {
    name: "X 3",
    pattern: [
      [0, 2],
      [0, 4],
      [1, 3],
      [2, 2],
      [2, 4],
    ],
    multiplier: 10,
  },

  {
    name: "V",
    pattern: [
      [0, 0],
      [0, 4],
      [1, 1],
      [1, 3],
      [2, 2],
    ],
    multiplier: 15,
  },
  {
    name: "^",
    pattern: [
      [0, 2],
      [1, 1],
      [1, 3],
      [2, 0],
      [2, 4],
    ],
    multiplier: 15,
  },

  {
    name: "+ 1",
    pattern: [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 1],
    ],
    multiplier: 10,
  },
  {
    name: "+ 2",
    pattern: [
      [0, 2],
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 2],
    ],
    multiplier: 10,
  },
  {
    name: "+ 3",
    pattern: [
      [0, 3],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
    ],
    multiplier: 10,
  },

  {
    name: "Column 1",
    pattern: [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    multiplier: 3,
  },
  {
    name: "Column 2",
    pattern: [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    multiplier: 3,
  },
  {
    name: "Column 3",
    pattern: [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    multiplier: 3,
  },
  {
    name: "Column 4",
    pattern: [
      [0, 3],
      [1, 3],
      [2, 3],
    ],
    multiplier: 3,
  },
  {
    name: "Column 5",
    pattern: [
      [0, 4],
      [1, 4],
      [2, 4],
    ],
    multiplier: 3,
  },
];

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const shootConfetti = (winSymbol) => {
  var scalar = 2;
  var winSyms = [];
  winSymbol.forEach((element) => {
    var symbol = confetti.shapeFromText({ text: element.symbol, scalar });
    winSyms.push(symbol);
  });

  var defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: winSyms,
    scalar,
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
    });

    confetti({
      ...defaults,
      particleCount: 5,
      flat: true,
    });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar: scalar / 2,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

const pityThreshold = 30;

const randomizeSymbols = (failCount) => {
  const symbols = ["🍒", "🍋", "🍇", "🔔", "⭐", "🍀"];

  if (failCount >= pityThreshold + 1) {
    console.log("Pity hit");
    const randomPayline = PAYLINES[Math.floor(Math.random() * PAYLINES.length)];
    const winningSymbol = symbols[Math.floor(Math.random() * symbols.length)];

    return Array.from({ length: 5 }, (_, colIndex) => {
      return Array.from({ length: 3 }, (_, rowIndex) => {
        const isWinningPosition = randomPayline.pattern.some(
          ([row, col]) => row === rowIndex && col === colIndex
        );

        return isWinningPosition
          ? winningSymbol
          : symbols[Math.floor(Math.random() * symbols.length)];
      });
    });
  }

  return Array.from({ length: 5 }, () => {
    const finalSymbols = Array.from(
      { length: 3 },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    );
    const dummySymbols = Array.from(
      { length: 25 },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    );
    return [...finalSymbols, ...dummySymbols];
  });
};

const checkWinCondition = (reels) => {
  const spinTime = getCurrentTime();
  const finalSymbols = reels.map((col) => col.slice(0, 3));

  if (!Array.isArray(reels) || !Array.isArray(reels[0])) {
    console.error("Error: reels is not a valid 2D array");
    return { isWin: false, paylinesHit: [] };
  }

  let paylinesHit = [];
  let gridPositions = [];
  let totalMultiplier = 0;

  PAYLINES.forEach(({ pattern, name, multiplier }) => {
    const symbolsInPayline = pattern.map(
      ([row, col]) => finalSymbols[col][row]
    );

    if (symbolsInPayline.every((symbol) => symbol === symbolsInPayline[0])) {
      paylinesHit.push({ symbol: symbolsInPayline[0], name, multiplier });
      totalMultiplier += multiplier;
      gridPositions.push(pattern);
    }
  });

  return {
    isWin: paylinesHit.length > 0,
    paylinesHit,
    totalMultiplier,
    spinTime,
    gridPositions,
  };
};

const Reel = forwardRef(({ saveHistory, bet }, ref) => {
  const [money, setMoney] = useState(localStorage.getItem("money"));
  const [failCount, setFailCount] = useState(1);
  const [reels, setReels] = useState(randomizeSymbols(failCount));
  const [isAnimating, setIsAnimating] = useState(false);
  const [winningGridPositions, setWinningGridPositions] = useState([]);
  const [message, setMessage] = useState("");
  const [isLose, setIsLose] = useState(false);

  useEffect(() => {
    if (message) {
      console.log(message);
    }
  }, [message]);

  useImperativeHandle(ref, () => ({
    regenerateSymbols() {
      if (money - bet < 0) {
        setMessage(() => "Insufficient Balance");
        return;
      } else {
        setMessage(() => "");
      }
      console.log("Check Balance - " + (money - bet));
      triggerLeverClick();
      if (isAnimating) return;
      setWinningGridPositions([]);
      setIsAnimating(true);

      const newSymbols = randomizeSymbols(failCount);
      setReels(newSymbols);

      setTimeout(() => {
        setIsAnimating(false);

        const { isWin, paylinesHit, gridPositions, totalMultiplier, spinTime } =
          checkWinCondition(newSymbols);

        setFailCount((prevCount) => {
          const newCount = isWin ? 1 : prevCount + 1;
          return newCount;
        });

        isWin
          ? setMoney((prev) => prev + bet * totalMultiplier)
          : setMoney((prev) => prev - bet);

          isWin
          ? setIsLose(false)
          : setIsLose(true)

        const newAmount = isWin ? money + bet * totalMultiplier : money - bet;
        localStorage.setItem("money", newAmount);

        saveHistory({
          symbols: newSymbols,
          result: isWin ? "Win" : "Lose",
          paylinesHit,
          spinTime,
          totalMultiplier,
          bet,
          totalMoney: newAmount,
        });
        isWin && shootConfetti(paylinesHit);
        setWinningGridPositions(gridPositions);
      }, 2500);
    },
  }));

  const triggerLeverClick = () => {
    const lever = document.querySelector(".lever");
    lever.classList.add("roll");
    setTimeout(() => {
      lever.classList.remove("roll");
    }, 2000);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        ref.current.regenerateSymbols();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, isAnimating]);

  return (
    <>
      <MessageBox
        customClass={`${message === "" && "hidden"}`}
        messageText={message}
      />
      <div className="moneyBox absolute text-white">
        <PiCurrencyDollarSimpleBold />
        {money.toLocaleString()}
      </div>
      <div
        className={`reel relative bg-neutral-900 ${
          isLose && !isAnimating ? "lose" : ""
        }`}
      >
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
                <span className="text-center drop-shadow-2xl" key={symbolIndex}>
                  {symbol}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

export default Reel;
