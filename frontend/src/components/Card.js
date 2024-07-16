// src/components/Card.js
import React from 'react';

function Card({ card }) {
    return (
        <div className="card">
            <img src={card.image_url} alt={card.name} className="card-image" />
            <div className="card-info">
                <h5 className="card-name">{card.name}</h5>
                <p className="card-mana-cost">Mana Cost: {card.mana_cost}</p>
            </div>
        </div>
    );
}

export default Card;
