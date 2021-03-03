import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { EscapeContext } from "../../context";
import { OnlinePlayContext } from "../OnlinePlayContext";
import LeftContainer from "./LeftContainer";
import { OnlineGameContext } from "./OnlineGameContext";
import RightContainer from "./RightContainer";
import ChooseColor from "./ChooseColor";
import "./_onlineGame.scss";
import { addPlayerBorder } from "./RightContainer/Game/Board/utils/addPlayerBorder";
import { removePlayerBorder } from "./RightContainer/Game/Board/utils/removePlayerBorder";
import { RouteComponentProps } from "@reach/router";
import { drawLine } from "./RightContainer/Game/Board/utils/drawLine";

const OnlineGame: FunctionComponent<RouteComponentProps> = () => {
  const { socket, username } = useContext(EscapeContext);
  const { onlinePlayers } = useContext(OnlinePlayContext);
  const [color, setColor] = useState<string | null>(null);
  const [boardSize, setBoardSize] = useState<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState<number[] | null>(null);
  const [isGameReady, setIsGameReady] = useState(false);
  const [availableMoves, setAvailableMoves] = useState<{
    [key: string]: string[];
  }>({});
  const [places, setPlaces] = useState<number[]>([]);
  const [orderForPlayers, setOrderForPlayers] = useState<number[]>([]);
  const [mostRecentMove, setMostRecentMove] = useState<{
    newX: number;
    newY: number;
    oldX: number;
    oldY: number;
    color: string;
  } | null>(null);

  // useEffect(() => {
  socket.on(
    "gameIsReady",
    ({
      moves,
      order,
      size,
    }: {
      moves: { [key: string]: string[] };
      order: number[];
      size: number;
    }) => {
      setAvailableMoves({ ...moves });
      setOrderForPlayers([...order]);
      setBoardSize(size);
      setIsGameReady(true);
    }
  );
  // }, []);
  useEffect(() => {
    socket.on(
      "playerMoved",
      ({
        newX,
        newY,
        oldX,
        oldY,
        color,
        moves,
        order,
      }: {
        newX: number;
        newY: number;
        oldX: number;
        oldY: number;
        color: string;
        moves: { [key: string]: string[] };
        order: number[];
      }) => {
        setMostRecentMove({ newX, newY, oldX, oldY, color });
        setOrderForPlayers(order);
        setAvailableMoves(moves);
        drawLine(newX, newY, oldX, oldY, color);
        removePlayerBorder(oldX, oldY);
        addPlayerBorder(newX, newY, color);
      }
    );

    socket.on(
      "playerLost",
      ({ order, newPlaces }: { order: number[]; newPlaces: number[] }) => {
        console.log({ order, newPlaces });
        setPlaces(newPlaces);
        setOrderForPlayers(order);
      }
    );
  }, []);

  useEffect(() => {
    if (currentPosition && orderForPlayers.length > 0) {
      if (
        onlinePlayers.players[orderForPlayers[0]] === username &&
        (availableMoves[`${currentPosition![0]}${currentPosition![1]}`]
          .length === 0 ||
          orderForPlayers.length <= 1)
      ) {
        socket.emit("playerLost", { orderForPlayers, places });
      }
    }
  }, [orderForPlayers]);

  return (
    <OnlineGameContext.Provider
      value={{
        availableMoves,
        orderForPlayers,
        color,
        setColor,
        currentPosition,
        setCurrentPosition,
        isGameReady,
        setOrderForPlayers,
        setAvailableMoves,
        mostRecentMove,
        boardSize,
        places,
      }}
    >
      <div className="onlineGame">
        {onlinePlayers.players.includes(username) && !color ? (
          <ChooseColor />
        ) : null}
        <LeftContainer />
        <RightContainer />
      </div>
    </OnlineGameContext.Provider>
  );
};

export default OnlineGame;
