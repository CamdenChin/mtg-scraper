import React, { useState } from 'react';
import axios from 'axios';

function CardSearch({ onSearchResults }) {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchCards = async (page = 1) => {
        if (query.trim() === '') return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5001/api/cards/search', {
                params: { name: query, page }
            });
            console.log('Fetched Data:', response.data.data); // Log the fetched data for debugging
            onSearchResults(response.data.data);
            setPage(page); // Update the page state
        } catch (err) {
            setError('Failed to fetch results. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        searchCards(1); // Reset to page 1 on new search
    };

    const handleNextPage = () => {
        searchCards(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            searchCards(page - 1);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for cards..."
                style={{ padding: '5px', width: '200px' }}
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div style={{ margin: '20px 0' }}>
                <button onClick={handlePrevPage} disabled={loading || page === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={loading}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default CardSearch;
