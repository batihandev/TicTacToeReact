import React, { useState } from "react";
import Square from "../Square/square";
const emptyBoard = Array(3).fill(null);
const Board = (props: any) => {
  return (
    <div>
      {emptyBoard.map((e, i) => {
        return (
          <div key={i} className="board-row">
            {emptyBoard.map((ce, ci) => {
              const index = ci + i * emptyBoard.length;
              return (
                <Square
                  winner={props.winningSetup?.includes(index)}
                  value={props.squares[index]}
                  onClick={() => props.onClick(index)}
                ></Square>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
