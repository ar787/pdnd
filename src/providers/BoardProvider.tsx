import {createContext, type ReactNode, useContext, useState} from "react";
import type {Board, BoardContextType} from "../types.ts";
import initData from '../data/board.json'

const BoardContext = createContext<BoardContextType>({
    board: {name: '', columns: []},
})

function  BoardProvider({children}: {children: ReactNode}) {
    const [board, setBoard] = useState<Board>(initData)

    return (
        <BoardContext.Provider value={{ board }}>
            {children}
        </BoardContext.Provider>
    );
}

const useBoard = () => useContext(BoardContext);
export { BoardProvider, useBoard };