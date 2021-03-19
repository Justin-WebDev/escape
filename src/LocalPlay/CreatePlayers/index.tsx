// import { navigate, Redirect, RouteComponentProps } from "@reach/router";
// import React, { FunctionComponent, useContext } from "react";
// import Player from "./Player";
// import "./_createPlayer.scss";
// import { EscapeContext } from "../context";

// const CreatePlayers: FunctionComponent<RouteComponentProps> = () => {
//   const { numberOfPlayers, players } = useContext(EscapeContext);
//   let arr = [...Array(numberOfPlayers).keys()];

//   return numberOfPlayers > 0 ? (
//     <div className="createPlayersContainer">
//       <div className="createPlayers">
//         {arr.map((player, index) => {
//           return <Player player={index + 1} />;
//         })}
//       </div>
//       {players.length === numberOfPlayers ? (
//         <button onClick={() => navigate("/game")}>Start Game</button>
//       ) : null}
//     </div>
//   ) : (
//     <Redirect to="/" />
//   );
// };

// export default CreatePlayers;
