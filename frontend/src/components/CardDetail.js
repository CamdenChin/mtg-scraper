import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function CardDetail() {
    const { cardId } = useParams(); // Get the card ID from the URL
    const location = useLocation();
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);

    // Function to fetch card details
    const fetchCardDetails = async (url, fallbackName = null) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 404 && fallbackName) {
                    console.log('Card not found by ID, attempting by name...');
                    const nameUrl = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(fallbackName)}`;
                    return fetchCardDetails(nameUrl);
                }
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCard(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const cardName = new URLSearchParams(location.search).get('name');
        const url = `https://api.scryfall.com/cards/${cardId}`;
        fetchCardDetails(url, cardName);
    }, [cardId, location.search]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!card) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{card.name}</h2>
            {card.image_uris && <img src={card.image_uris.large} alt={card.name} />}
            {card.oracle_text && <p>{card.oracle_text}</p>}
            {card.mana_cost && <p>{card.mana_cost}</p>}
            {card.type_line && <p>{card.type_line}</p>}
            {card.set_name && <p>Set: {card.set_name}</p>}
            {/* Add any other card details you want to display */}
        </div>
    );
}

export default CardDetail;







