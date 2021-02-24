// import React, { FunctionComponent, useReducer } from "react";

// interface IRoomState {
//   roomName: string;
//   neededAmountOfPlayers: number;
//   players: string[];
//   status: boolean;
// }

// interface IRoomDispatch {
//   type: string;
//   roomName?: string;
//   playerName?: string;
// }

// const reducer = (state: IRoomState, action: IRoomDispatch) => {
//   switch (action.type) {
//     case "ADD_PLAYER":
//       return Object.assign({}, state, {
//         players: [...state.players, action.playerName],
//       });
//     case "CHANGE_ROOMNAME":
//       console.log("ACTION: ", action);
//       return Object.assign({}, state, {
//         roomName: action.roomName,
//       });
//     default:
//       return state;
//   }
// };

// const useRoom = () => {
//   const [
//     { roomName, players, neededAmountOfPlayers, status },
//     dispatch,
//   ] = useReducer(reducer, {
//     roomName: "",
//     neededAmountOfPlayers: 0,
//     players: [],
//     status: false,
//   });

//   const Room: FunctionComponent = () => (
// <div className="roomContainer">
//   <div>{roomName}</div>
//   <div>{`Players: ${players.length} / ${neededAmountOfPlayers}`}</div>
//   <div>{status ? "Game in Progress" : "Game Not Started"}</div>
// </div>
//   );

//   return [roomName, players, neededAmountOfPlayers, status, Room, dispatch] as [
//     string,
//     string[],
//     number,
//     boolean,
//     FunctionComponent,
//     ({}: IRoomDispatch) => IRoomState
//   ];
// };

// export default useRoom;
