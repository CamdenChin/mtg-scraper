import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardList from './CardList';

function PaginatedCards() {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCards = async (page) => {
        setIsLoading(true);

        try {
            const response = await axios.get(`http://localhost:5001/api/cards/search?page=${page}&limit=10`);
            setCards(response.data.data); // Completely replaces the old data
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch cards:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCards(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <CardList cards={cards} />
            {isLoading ? <p>Loading...</p> : null}
            <div style={{ margin: '20px 0' }}>
                <button onClick={handlePrevPage} disabled={isLoading || currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={isLoading}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PaginatedCards;





