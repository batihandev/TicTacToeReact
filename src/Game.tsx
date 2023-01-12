import { useState } from "react";
import Board from "./components/Board/board";
function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}
const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setX] = useState(true);
  //const [state, setState] = useState({history: [{squares: Array(9).fill(null)}] , xIsNext:true});
  const [clearRow, setClearRow] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const current = history[stepNumber];
  const [row, setRow] = useState<number[]>([]);
  const [col, setCol] = useState<number[]>([]);
  const [isActive, setActive] = useState<number | null>(null);

  const moves = history.map((step, move) => {
    return (
      <li key={move}>
        {move ? (
          <p>
            ROW: {row[move - 1]} COL: {col[move - 1]} Played:
            {(move - 1) % 2 === 1 ? "O" : "X"}
          </p>
        ) : null}
        <button
          className={isActive === move ? "bold_button" : ""}
          onClick={() => {
            jumpTo(move);
            setActive(move);
          }}
        >
          {move ? "Go to move #" + move : "Go to game start"}
        </button>
      </li>
    );
  });
  function jumpTo(step: any) {
    setStepNumber(step);
    setX(step % 2 === 0);
    setClearRow(true);
  }
  function handleClick(i: number) {
    const history_ = history.slice(0, stepNumber + 1);
    const current = history_[history_.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    let col_ = () => {
      if ((i + 1) % 3 === 0) {
        return i + 1;
      } else {
        return (i + 1) % 3;
      }
    };
    if (clearRow) {
      setCol([...col.slice(0, history_.length - 1), col_()]);

      if (2 < i && i <= 5) {
        setRow([...row.slice(0, history_.length - 1), 2]);
      } else if (i >= 6) {
        setRow([...row.slice(0, history_.length - 1), 3]);
      } else {
        setRow([...row.slice(0, history_.length - 1), 1]);
      }
      setClearRow(false);
    } else {
      setCol([...col, col_()]);

      if (2 < i && i <= 5) {
        setRow([...row, 2]);
      } else if (i >= 6) {
        setRow([...row, 3]);
      } else {
        setRow([...row, 1]);
      }
    }

    setHistory(history_.concat([{ squares: squares }]));
    setX(!xIsNext);
    setStepNumber(history_.length);
  }
  const [winner, winningSetup] = calculateWinner(current.squares) ?? [];

  let status = "Next player: " + (xIsNext ? "X" : "O");
  if (winner) {
    status = "Winner: " + winner;
  } else if (history.length === 10) {
    status = "DRAW";
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          winningSetup={winningSetup}
          squares={current.squares}
          onClick={(i: any) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>{moves}</div>
      </div>
    </div>
  );
};

export default Game;
