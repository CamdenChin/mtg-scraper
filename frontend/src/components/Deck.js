import React, { useState } from 'react';

function Deck() {
    const [deck, setDeck] = useState([]);

    const addCardToDeck = (card) => {
        setDeck(prevDeck => [...prevDeck, card]);
    };

    return (
        <div>
            <h3>My Deck</h3>
            {deck.map((card, index) => (
                <div key={index}>{card.name}</div>
            ))}
        </div>
    );
}

export default Deck;
