// import React, { FunctionComponent, useContext, useState } from "react";
// import { EscapeContext } from "../context";
// import Color from "./Color";

// const Player: FunctionComponent<{ player: number }> = ({ player }) => {
//   const { players, setPlayers } = useContext(EscapeContext);
//   const colors = ["red", "blue", "green", "gold"];

//   const [playerColor, setPlayerColor] = useState<string | null>(null);
//   const [playerDisplayName, setPlayerDisplayName] = useState<string>(
//     `Player-${player}`
//   );
//   const [isReady, setIsReady] = useState(false);

//   return !isReady ? (
//     <div className="player-setup">
//       <label>Display Name:</label>
//       <input
//         id={`displayName-${player}`}
//         type="text"
//         defaultValue={playerDisplayName}
//         style={{ marginBottom: "20px", marginTop: "5px" }}
//         onKeyDown={(e) =>
//           setPlayerDisplayName(
//             e.key === "Backspace"
//               ? e.currentTarget.value.slice(0, e.currentTarget.value.length - 1)
//               : e.currentTarget.value + e.key
//           )
//         }
//       />
//       <label>Choose Color:</label>
//       <div className="colors">
//         {colors.map((color) => (
//           <Color
//             color={color}
//             player={player}
//             setPlayerColor={setPlayerColor}
//           />
//         ))}
//       </div>
//       <br />
//       {document
//         .getElementById(`displayName-${player}`)
//         ?.getAttribute("value") !== "" && playerColor !== null ? (
//         <button
//           onClick={() => {
//             setPlayers([
//               ...players,
//               {
//                 name: playerDisplayName,
//                 color: playerColor,
//                 currentPosition: "",
//               },
//             ]);
//             setIsReady(true);
//           }}
//         >
//           Ready
//         </button>
//       ) : null}
//     </div>
//   ) : (
//     <div className="player-setup">
//       <div style={{ fontSize: "30px" }}>
//         <div>Ready!</div>
//         <br />
//         <div>
//           Good Luck,{" "}
//           <span style={{ color: `${playerColor}` }}>{playerDisplayName}</span>!
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Player;
