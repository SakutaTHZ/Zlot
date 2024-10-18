import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const History = ({ history }) => {
  const [filter, setFilter] = useState("all");

  const filteredHistory = history.filter((spin) => {
    if (filter === "wins") return spin.result === "Win";
    if (filter === "losses") return spin.result === "Lose";
    return true;
  });

  return (
    <div className="history flex flex-col gap-2 py-2">
      <h1 className="text-2xl pb-2">History</h1>
      {/* Filter Buttons */}
      <div className="historyFilters flex justify-between gap-2 mb-2 text-neutral-100">
        <button
          className={`w-full py-1 px-3 flex justify-between gap-1 ${
            filter === "all"
              ? "bg-neutral-700 text-white"
              : "bg-transparent border border-neutral-700"
          }`}
          onClick={() => setFilter("all")}
        >
          All <span className="allCount">{history.length}</span>
        </button>
        <button
          className={`w-full py-1 px-3 flex justify-between gap-1 ${
            filter === "wins"
              ? "bg-green-500 text-green-500 bg-opacity-10"
              : "bg-transparent border border-neutral-700"
          }`}
          onClick={() => setFilter("wins")}
        >
          Wins{" "}
          <span className="winCount">
            {history.filter((spin) => spin.result === "Win").length}
          </span>
        </button>

        <button
          className={`w-full py-1 px-3 flex justify-between gap-1 ${
            filter === "losses"
              ? "bg-red-500 text-red-500 bg-opacity-10"
              : "bg-transparent border border-neutral-700"
          }`}
          onClick={() => setFilter("losses")} 
        >
          Loses{" "}
          <span className="loseCount">
            {history.filter((spin) => spin.result === "Lose").length}
          </span>
        </button>
      </div>

      {filteredHistory
        .slice()
        .reverse()
        .map((spin, spinIndex) => (
          <div
            className="historyBlock flex flex-col gap-1 border-b pb-4 border-b-neutral-700"
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
              <div className="p-2 py-1">
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
                  </>
                )}
              </div>
            </div>
            <div className="px-4 bg-neutral-700 bg-opacity-50 rounded-md">
              <p className="py-1 w-full flex justify-between font-semibold">
                <span className="pl-1">Bet</span>
                <span className="flex items-center gap-1">{spin.bet}</span>
              </p>
              <p className="py-1 w-full flex justify-between font-semibold">
                <span className="pl-1">Total</span>
                <span className="flex items-center gap-1">
                  {spin.result === "Win"
                    ? <FaCaretUp className="text-green-500"/>
                    : 
                    <FaCaretDown className="text-red-500"/>}
                  $ {spin.totalMoney.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default History;
