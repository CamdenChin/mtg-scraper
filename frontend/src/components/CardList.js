import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function CardList({ cards }) {
    const [validCards, setValidCards] = useState(cards);

    useEffect(() => {
        setValidCards(cards); // Update validCards whenever cards prop changes
    }, [cards]);

    const handleImageError = (index) => {
        setValidCards((prevCards) => prevCards.filter((_, i) => i !== index));
    };

    if (!validCards.length) {
        return <p>No cards found with images.</p>; // Friendly message when no cards are returned
    }

    return (
        <div id="search-results" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {validCards.map((card, index) => (
                <div key={index} style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                    <img 
                        src={card.image_url} 
                        alt={card.name} 
                        className="card-image" 
                        onError={() => handleImageError(index)}
                    />
                    {/* <p>{card.name}</p>
                    <p>{card.mana_cost || 'No mana cost'}</p> */}
                </div>
            ))}
        </div>
    );
}

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            image_url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            mana_cost: PropTypes.string,
        })
    ).isRequired,
};

export default CardList;
