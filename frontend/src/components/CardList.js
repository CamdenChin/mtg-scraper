import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function CardList({ cards }) {
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    if (!cards.length) {
        return <p>No cards found with images.</p>; // Friendly message when no cards are returned
    }

    return (
        <div id="search-results" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {cards.map((card, index) => (
                <div 
                    key={index} 
                    style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => {
                        navigate(`/card/${card.id}?name=${encodeURIComponent(card.name)}`);
                    }}
                >
                    <img src={card.image_url} alt={card.name} className="card-image" />
                    {/* <p>{card.name}</p> */}
                    {/* <p>{card.mana_cost || 'No mana cost'}</p> */}
                </div>
            ))}
        </div>
    );
}

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            image_url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CardList;





