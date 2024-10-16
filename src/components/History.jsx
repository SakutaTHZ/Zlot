const History = ({ history }) => {
  return (
    <div className="history flex flex-col gap-2 py-2">
      {/* Reverse the history array so that the latest spins appear first */}
      {history.slice().reverse().map((spin, spinIndex) => (
        <div className="flex flex-col gap-1" key={spinIndex}>
          <strong className="text-neutral-100 mb-2">
            Spin {history.length - spinIndex} at : {spin.spinTime}
          </strong>

          {/* Display the symbols for each column */}
          <div className="flex gap-2">
            {spin.symbols.map((colSymbols, colIndex) => (
              <div className="flex flex-col" key={colIndex}>
                {colSymbols.slice(0, 3).map((symbol, index) => (
                  <span className="text-xl" key={index}>{symbol}</span>
                ))}
              </div>
            ))}
          </div>

          {/* Display Win/Lose */}
          <div>
            <p className={spin.result === "Win" ? "text-green-500" : "text-red-500"}>
              {spin.result} 
            </p>
          </div>

          {/* Display Paylines Hit */}
          <div>
            <p className="text-neutral-300">
              {spin.paylinesHit.length > 0 && (
                spin.paylinesHit.map((payLine,payLineIndex)=>(
                  <span key={payLineIndex}>{payLine.symbol} {payLine.name} {payLine.multiplier}</span>
                ))
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
