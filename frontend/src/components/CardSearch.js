import React, { useState } from 'react';
import axios from 'axios';

function CardSearch({ onSearchResults }) {
    const [query, setQuery] = useState('');

    const searchCards = async () => {
        const response = await axios.get(`http://localhost:5001/api/cards/search?name=${query}`);
        onSearchResults(response.data.data);
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={searchCards}>Search</button>
        </div>
    );
}

export default CardSearch;
