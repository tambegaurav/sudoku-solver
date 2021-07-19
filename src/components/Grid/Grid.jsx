import React from "react";
import styled from "styled-components";

const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 60px);
  grid-template-rows: 60px;

  & > p {
    display: grid;
    place-content: center;
    background-color: #252420;
    height: 100%;
    border: 2px solid #13777a;
    border-radius: 3px;
    color: #ececec;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
  }
`;

const Layout = styled.div`
  display: grid;
  place-content: center;
`;

const Row = ({ row }) => {
  return (
    <RowWrapper>
      {row.map((num, idx) => (
        <p key={idx}>{num !== 0 ? num : ""}</p>
      ))}
    </RowWrapper>
  );
};

const Grid = ({ matrix, rows = 9, cols = 9 }) => {
  return (
    <Layout>
      {matrix.map((el, idx) => (
        <Row key={idx} row={el} />
      ))}
    </Layout>
  );
};

export default Grid;
