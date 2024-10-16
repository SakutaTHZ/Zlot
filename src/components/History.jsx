import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const History = ({ history }) => {
  const [filter, setFilter] = useState("all"); // Track the active filter ("all", "wins", or "losses")

  // Function to filter the history based on the active filter
  const filteredHistory = history.filter((spin) => {
    if (filter === "wins") return spin.result === "Win";
    if (filter === "losses") return spin.result === "Lose";
    return true; // Show all spins if no filter is active
  });

  return (
    <div className="history flex flex-col gap-2 py-2">
      {/* Filter Buttons */}
      <div className="historyFilters flex justify-between gap-2 mb-2 text-neutral-100">
        {/* Show all button */}
        <button
          className={`w-full py-1 px-3 flex justify-between ${
            filter === "all"
              ? "bg-neutral-700 text-white"
              : "bg-transparent border border-neutral-700"
          }`}
          onClick={() => setFilter("all")} // Set filter to "all"
        >
          All <span className="allCount">{history.length}</span>
        </button>
        <button
          className={`w-full py-1 px-3 flex justify-between ${
            filter === "wins"
              ? "bg-green-500 text-green-500 bg-opacity-10"
              : "bg-transparent border border-neutral-700"
          }`}
          onClick={() => setFilter("wins")} // Set filter to "wins"
        >
          Wins{" "}
          <span className="winCount">
            {history.filter((spin) => spin.result === "Win").length}
          </span>
        </button>

        <button
          className={`w-full py-1 px-3 flex justify-between ${
            filter === "losses"
              ? "bg-red-500 text-red-500 bg-opacity-10"
              : "bg-transparent border border-neutral-700"
          }`}
          onClick={() => setFilter("losses")} // Set filter to "losses"
        >
          Loses{" "}
          <span className="loseCount">
            {history.filter((spin) => spin.result === "Lose").length}
          </span>
        </button>
      </div>

      {/* Reverse and map the filtered history */}
      {filteredHistory
        .slice()
        .reverse()
        .map((spin, spinIndex) => (
          <div
            className="flex flex-col gap-1 border-b pb-2 border-b-neutral-700"
            key={spinIndex}
          >
            <strong className="flex  justify-between text-neutral-400 mb-2">
              <p>
                Spin{" "}
                <span className="text-neutral-200">
                  {history.length - spinIndex}
                </span>{" "}
                at : <span className="text-neutral-200">{spin.spinTime}</span>
              </p>

              <p
                className={`px-4 bg-opacity-10 rounded-lg ${
                  spin.result === "Win"
                    ? "bg-green-500 text-green-500"
                    : " bg-red-500 text-red-500"
                }`}
              >
                {spin.result}
              </p>
            </strong>

            {/* Display the symbols for each column */}
            <div className="flex justify-between p-8 py-4 md:p-4 bg-neutral-900 rounded-md">
              {spin.symbols.map((colSymbols, colIndex) => (
                <div className="flex flex-col" key={colIndex}>
                  {colSymbols.slice(0, 3).map((symbol, index) => (
                    <span className="text-xl" key={index}>
                      {symbol}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {/* Display Paylines Hit */}
            <div className="flex flex-col text-neutral-300">
              <div className=" p-2">
                {spin.paylinesHit.length > 0 && (
                  <>
                    {spin.paylinesHit.map((payLine, payLineIndex) => (
                      <p
                        className="w-full flex justify-between"
                        key={payLineIndex}
                      >
                        <span>
                          {payLine.symbol} {payLine.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <RxCross2 size={10} />
                          {payLine.multiplier}
                        </span>
                      </p>
                    ))}
                    <p className="mt-2 border-t py-1 w-full flex justify-between font-semibold">
                      <span className="pl-1">Total</span>
                      <span className="flex items-center gap-1">1000</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default History;
