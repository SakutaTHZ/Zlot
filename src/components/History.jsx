const History = ({ history }) => {
  return (
    <div className="history">
      <h3>History</h3>
      {history.map((spin, spinIndex) => (
        <div key={spinIndex}>
          <strong>Spin {spinIndex + 1}:</strong>
          {spin.map((colSymbols, colIndex) => (
            <div key={colIndex}>
              Reel {colIndex + 1}: {colSymbols.slice(0, 3).join(" ")}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default History;
