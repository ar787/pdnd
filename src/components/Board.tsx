import type {CSSProperties} from "react";
import Column from "./Column.tsx";
import {useBoard} from "../providers/BoardProvider.tsx";

const boardContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
}

export  function Board() {
    const {board} = useBoard()

    return <div style={boardContainerStyle}>
        {board.columns.map((column, index) => (
            <Column key={index} column={column}/>
        ))}


    </div>
}

export  default  Board