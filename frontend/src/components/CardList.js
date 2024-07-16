import React from 'react';

function CardList({ cards }) {
    if (!cards.length) {
        return <p>No cards found with images.</p>; // Friendly message when no cards are returned
    }

    return (
        <div id="search-results" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {cards.map((card, index) => (
                <div key={index} style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                    <img src={card.image_url} alt={card.name} style={{ maxWidth: '100%', borderRadius: '4px' }} />
                    <p>{card.name}</p>
                    <p>{card.mana_cost || 'No mana cost'}</p>
                </div>
            ))}
        </div>
    );
}

export default CardList;
