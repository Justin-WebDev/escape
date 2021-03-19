// import React, { useContext } from "react";
// import { EscapeContext } from "../context";

// const addStyleToButton = (e: { [key: string]: any }) => {
//   e.target.style.backgroundColor = "lightblue";
// };

// const removeStylesFromButtons = () => {
//   document
//     .querySelectorAll<HTMLElement>(".button-boardSize")
//     .forEach((element) => {
//       element.style.backgroundColor = "white";
//     });
// };

// const SizeOfBoard = () => {
//   const { setBoardSize } = useContext(EscapeContext);

//   return (
//     <div className="sizeOfBoard">
//       <div>Board Size:</div>
//       <br />
//       <br />
//       <span
//         id="button-players-1"
//         className="button-boardSize"
//         onClick={(e) => {
//           setBoardSize(4);
//           removeStylesFromButtons();
//           addStyleToButton(e);
//         }}
//       >
//         4x4
//       </span>
//       <span
//         id="button-players-1"
//         className="button-boardSize"
//         onClick={(e) => {
//           setBoardSize(5);
//           removeStylesFromButtons();
//           addStyleToButton(e);
//         }}
//       >
//         5x5
//       </span>
//       <span
//         id="button-players-1"
//         className="button-boardSize"
//         onClick={(e) => {
//           setBoardSize(6);
//           removeStylesFromButtons();
//           addStyleToButton(e);
//         }}
//       >
//         6x6
//       </span>
//       <span
//         id="button-players-1"
//         className="button-boardSize"
//         onClick={(e) => {
//           setBoardSize(7);
//           removeStylesFromButtons();
//           addStyleToButton(e);
//         }}
//       >
//         7x7
//       </span>
//     </div>
//   );
// };

// export default SizeOfBoard;
