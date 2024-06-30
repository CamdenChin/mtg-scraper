import React from 'react';

const CardList = ({ cards }) => {
    return (
        <ul>
            {cards.map(card => (
                <li key={card.id}>
                    <img src={card.image_url} alt={card.name} style={{ width: "100px", height: "auto" }} />
                    <div>{card.name} - Mana Cost: {card.mana_cost}</div>
                </li>
            ))}
        </ul>
    );
};

export default CardList;
