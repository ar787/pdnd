import Card from "./Card.tsx";
import type {CSSProperties, ReactNode} from "react";
import type {ColumnType} from '../types.ts'

type ColumnProps = {
    column: ColumnType
    children?: ReactNode
}
const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    border: '2px solid #ccc',
    height: '70vh',
    width: '300px',
    padding: '10px',
}

const scrollableContainerStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '14px',
    overflowY: 'auto',
    minHeight: 0,
    listStyleType: 'none',
    padding: 0,
    margin: 0,
}

function Column({column}: ColumnProps) {
    return (
        <div style={containerStyle}>
            <p style={{textAlign: 'left'}}>{column.name}</p>
                <ul style={scrollableContainerStyle}>
                    {column.cards.map((card, index) =>
                        <Card  key={index} card={card}/>
                    )}
                </ul>
        </div>
    )
}


export  default Column