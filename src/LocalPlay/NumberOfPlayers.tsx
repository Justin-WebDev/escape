// import React, { FunctionComponent, useContext } from "react";
// import { EscapeContext } from "../context";

// // MAKE THIS REUSEABLE FOR SIZEOFBOARD AND NUMBEROFPLAYERS

// const addStyleToButton = (e: { [key: string]: any }) => {
//   e.target.style.backgroundColor = "lightblue";
// };

// const removeStylesFromButtons = () => {
//   document
//     .querySelectorAll<HTMLElement>(".button-players")
//     .forEach((element) => {
//       element.style.backgroundColor = "white";
//     });
// };

// const NumberOfPlayers: FunctionComponent = () => {
//   const { setNumberOfPlayers } = useContext(EscapeContext);
//   return (
//     <div>
//       <div># of Players:</div>
//       <br />
//       <br />
//       <span
//         id="button-players-2"
//         className="button-players"
//         onClick={(e) => {
//           setNumberOfPlayers(2);
//           removeStylesFromButtons();
//           addStyleToButton(e);
//         }}
//       >
//         two
//       </span>
//       <span
//         id="button-players-3"
//         className="button-players"
//         onClick={(e) => {
//           setNumberOfPlayers(3);
//           removeStylesFromButtons();
//           addStyleToButton(e);
//         }}
//       >
//         three
//       </span>
//       <span
//         id="button-players-4"
//         className="button-players"
//         onClick={(e) => {
//           setNumberOfPlayers(4);
//           removeStylesFromButtons();
//           addStyleToButton(e);
//         }}
//       >
//         four
//       </span>
//       <span
//         id="button-players-4"
//         className="button-players"
//         onClick={(e) => {
//           // setNumberOfPlayers(4);
//           removeStylesFromButtons();
//           addStyleToButton(e);
//         }}
//       >
//         Custom
//       </span>
//     </div>
//   );
// };

// export default NumberOfPlayers;
