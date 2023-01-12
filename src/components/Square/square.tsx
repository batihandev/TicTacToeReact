import React, { Children, ReactNode } from "react";
type SquareProps = {
  value: string;
  onClick: any;
  children?: ReactNode;
  winner: boolean;
};

const Square = (props: SquareProps) => {
  return (
    <button
      className={"square ".concat(props.winner ? "winner" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
