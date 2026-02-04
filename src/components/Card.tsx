import type {CSSProperties} from "react";
import type {CardType} from '../types.ts'

type CardProps = {
    card: CardType
}
const cardStyle: CSSProperties = {
    border: "1px solid black",
    minHeight: '50px'
}
function Card({card} : CardProps) {
    return (
        <li style={cardStyle}>
            <span>{card.title}</span>
        </li>
    )
}

export default Card;