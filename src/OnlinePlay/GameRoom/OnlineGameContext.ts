import { createContext, Dispatch, SetStateAction } from "react";

interface IGameContext {
  color: string | null;
  currentPosition: number[] | null;
  setColor: Dispatch<SetStateAction<string | null>>;
  setCurrentPosition: Dispatch<SetStateAction<number[] | null>>;
}

export const OnlineGameContext = createContext({} as IGameContext);
