import {type CSSProperties, useEffect, useRef, useState} from "react";
import type {CardType} from '../types.ts'
import {draggable, dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {combine} from "@atlaskit/pragmatic-drag-and-drop/combine";
import {useBoard} from "../providers/BoardProvider.tsx";


type CardProps = {
    card: CardType
    position: number
}

const commonCardStyle = {
    border: "1px solid black",
    minHeight: '50px',
    display: 'flex',
    flexDirection: 'column',
}
const cardStyle: CSSProperties = {
   ...commonCardStyle,
    cursor: 'grab'
}

const cardDragStyle = {
    ...commonCardStyle,
    opacity: 0.2
}
function Card({card, position} : CardProps) {
    const [dragging, setDragging] = useState<boolean>(false);
    const ref = useRef<HTMLLIElement>(null);
    const { moveCard } = useBoard()

    useEffect(() => {
        const element = ref.current;
        if(element === null) return

       return combine(draggable({
            element,
            getInitialData: () => card,
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false),
        }),
        dropTargetForElements({
            element,
            getData: () => card,
            onDrop: ({source, self}) => {
                moveCard(source.data.id as string, self.data.columnId as string, position)
            }
        })
       )
    }, [card, moveCard, position])

    return (
        <li ref={ref} style={dragging ? cardDragStyle : cardStyle}>
            <span>{card.id}</span>
            <span>{card.title}</span>
        </li>
    )
}

export default Card;