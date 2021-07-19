/* eslint-disable react/jsx-no-target-blank */
import "./App.css";
import SudokuSolver from "./components/SudokuSolver";
import styled from "styled-components";

const Footer = styled.div`
  font-family: "Courier New", Courier, monospace;
  font-size: 20px;
  /* background-color: yellow; */
  width: 100%;
  margin-top: 100px;
  & a {
    color: #fff;
    text-decoration: none;
  }
`;

function App() {
  return (
    <div className="App">
      <SudokuSolver />
      <Footer>
        <h4>
          Made with ❤️ by{" "}
          <a href="https://gauravtambe.com" target="_blank">
            Gaurav Tambe
          </a>
        </h4>
      </Footer>
    </div>
  );
}

export default App;
