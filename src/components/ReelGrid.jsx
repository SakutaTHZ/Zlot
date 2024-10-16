const ReelGrid = ({ winningGridPositions }) => {
    const totalRows = 3; // Adjust based on your layout
    const totalCols = 5; // Adjust based on your layout
  
    return (
      <div className="reelGrid absolute flex flex-wrap box-border h-full w-full z-40">
        {Array.from({ length: totalRows }).map((_, rowIndex) => (
          Array.from({ length: totalCols }).map((_, colIndex) => {
            // Check if the current cell is in the winning grid positions
            const isWinningCell = winningGridPositions.some(pattern => 
              pattern.some(([row, col]) => row === rowIndex && col === colIndex)
            );
  
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`grid w-1/5 h-1/3 border ${isWinningCell ? "bg-yellow-300" : ""}`} // Change color if winning
              ></div>
            );
          })
        ))}
      </div>
    );
  };
  