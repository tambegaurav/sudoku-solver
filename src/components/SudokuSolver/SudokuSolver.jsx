/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Grid from "../Grid/Grid";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ButtonsLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  justify-content: center;
  justify-items: center;
  margin: auto;
  margin-top: 20px;
  gap: 10px;

  & > button {
    font-size: 20px;
    color: white;
    background-color: #464646;
    border-radius: 10px;
    padding: 5px;
    cursor: pointer;

    :hover {
      background-color: #333333;
    }
  }
`;

const SudokuSolver = () => {
  let grid = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
  ];

  const [matrix, setMatrix] = React.useState(grid);

  let input = `3 0 6 5 0 8 4 0 0
5 2 0 0 0 0 0 0 0
0 8 7 0 0 0 0 3 1
0 0 3 0 1 0 0 8 0
9 0 0 8 6 3 0 0 5
0 5 0 0 9 0 6 0 0
1 3 0 0 0 0 2 5 0
0 0 0 0 0 0 0 7 4
0 0 5 2 0 6 3 0 0`;

  const [inputProb, setInputProb] = useState(input);

  function sleep(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  function isValid(grid, row, col, num) {
    //row check
    for (let x = 0; x <= 8; x++) {
      if (grid[row][x] === num) return false;
    }

    //col check
    for (let x = 0; x <= 8; x++) {
      if (grid[x][col] === num) return false;
    }

    // in the particular 3*3
    let startRow = row - (row % 3),
      startCol = col - (col % 3);

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] === num) return false;

    return true;
  }

  const solveSudoku = async (row, col) => {
    //reached to the end of the grid
    if (row === 8 && col === 9) {
      // console.log("SOlution", matrix);
      return true;
    }

    //reached and filled the last col, then moving to next row
    if (col === 9) {
      row++;
      col = 0;
    }

    //check if the position is already filled, solve for next position
    if (matrix[row][col] !== 0) {
      return solveSudoku(row, col + 1);
    }
    //run the for loop for num = 1 to 9
    for (let i = 1; i <= 9; i++) {
      //if the pos is valid put number i in the pos
      if (isValid(matrix, row, col, i)) {
        await sleep(10);
        matrix[row][col] = i;
        // console.log([...matrix.map((el) => [...el])]);
        setMatrix([...matrix.map((el) => [...el])]);

        if (await solveSudoku(row, col + 1)) return true;
      }
      matrix[row][col] = 0;
    }

    return false;
  };

  const setSoduku = () => {
    let input = inputProb.trim().split("\n");
    let question = [];
    input.map((el) => question.push(el.trim().split(" ").map(Number)));
    setMatrix(question);
  };

  useEffect(() => {
    // console.log(matrix);
  }, [matrix]);

  return (
    <div>
      <h1>Sudoku Solver</h1>
      <Layout>
        <Grid matrix={matrix} />
        <div>
          <h1>Input Box for Sudoku</h1>
          <textarea
            rows={9}
            value={inputProb}
            onChange={(e) => setInputProb(e.target.value)}
            style={{ fontSize: "20px", fontWeight: "600" }}
          />
          <ButtonsLayout>
            <button
              onClick={() => {
                console.log(solveSudoku(0, 0));
                console.log("click");
              }}
            >
              Solve
            </button>

            <button onClick={setSoduku}>Set Sudoku</button>
          </ButtonsLayout>
        </div>
      </Layout>
    </div>
  );
};

export default SudokuSolver;
