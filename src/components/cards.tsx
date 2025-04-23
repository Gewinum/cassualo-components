import * as React from "react";
import Nothing from "../utils/nothing.ts";
import "../styles/cards.css";

type Props = {
    cards: {img: string, alt: string, contents: string}[];
};

class Cards extends React.Component<Props, Nothing> {
    render() {
        return (
            <div className="cards">
                {
                    this.props.cards.map((card, index) => (
                        <div className="card" key={index}>
                            <img src={card.img} alt={card.alt} />
                            <p>{card.contents}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Cards;