import {createContext, type ReactNode, useCallback, useContext, useState} from "react";
import type {Board, BoardContextType, CardType} from "../types.ts";
import initData from '../data/board.json'

const BoardContext = createContext<BoardContextType>({
    board: {name: '', columns: []},
    moveCard: () => {},
})

function  BoardProvider({children}: {children: ReactNode}) {
    const [board, setBoard] = useState<Board>(initData)

    const moveCard = useCallback((sourceCardId: string, targetColumnId: string, targetPosition: number) => {
        setBoard(prevBoard => {
            let movedCard: CardType | null = null;

            const columns = prevBoard.columns.map(column => {
                // remove card from its original column
                if (column.cards.some(card => card.id === sourceCardId)) {
                    const newCards = column.cards.filter(card => {
                        if (card.id === sourceCardId) {
                            movedCard = { ...card, columnId: targetColumnId };
                            return false;
                        }
                        return true;
                    });

                    return { ...column, cards: newCards };
                }

                return column;
            });

            if (!movedCard) return prevBoard;

            const updatedColumns = columns.map(column => {
                if (column.id === targetColumnId) {
                    const newCards = [...column.cards];
                    newCards.splice(targetPosition, 0, movedCard as CardType);
                    return { ...column, cards: newCards };
                }

                return column;
            });

            return {
                ...prevBoard,
                columns: updatedColumns,
            };
        });
    }, [setBoard])

    return (
        <BoardContext.Provider value={{ board, moveCard }}>
            {children}
        </BoardContext.Provider>
    );
}

const useBoard = () => useContext(BoardContext);
export { BoardProvider, useBoard };