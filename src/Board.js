import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let r = 0; r < nrows; r ++){
      let row = [];
      for (let c = 0; c < ncols; c ++){
         row.push(Math.random() > 0.5)
      }
      initialBoard.push(row)
    }
    console.log(initialBoard)
    return initialBoard;
  }

  function hasWon() {
    let result = true;
   for(let row of board){
    for(let cell of row){
      if (cell){
        result = false;
      }
    }
   }
   return result
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      // get number coords of the cell clicked
      const [y, x] = coord.split("-").map(Number);

      
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
        //up
        if (x >= 0 && x < ncols && y+1 >= 0 && y+1 < nrows){
          boardCopy[y+1][x] = !boardCopy[y+1][x];
        }
        //right
        if (x+1 >= 0 && x+1 < ncols && y >= 0 && y < nrows){
          boardCopy[y][x+1] = !boardCopy[y][x+1];
        }
        //left
        if (x-1 >= 0 && x-1 < ncols && y >= 0 && y < nrows){
          boardCopy[y][x-1] = !boardCopy[y][x-1];
        }
        //down
        if (x >= 0 && x < ncols && y-1 >= 0 && y-1 < nrows){
          boardCopy[y-1][x] = !boardCopy[y-1][x];
        }
        return boardCopy
      };
      // create a deep copy of the old board
      let boardCopy =[];
      for (let row of oldBoard){
        boardCopy.push([...row])
      }
      // then flip all the necessary cells
      let newBoard = flipCell(y, x, boardCopy)
      
      return newBoard
    });
  }
  console.log("####################", board)
  if (hasWon()) return <p>You won!</p>
  else{
    return(
      <div className="Board">
        <table>
          <tbody>
          {board.map((row, yidx) => {
          return (
            <tr key={`row${yidx}`}>
              {row.map((cellVal, xidx) => <Cell coord= {`${yidx}-${xidx}`} isLit={cellVal} flipCellsAroundMe= {flipCellsAround} key={`${yidx}-${xidx}`} />)}
            </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }

}

export default Board;
