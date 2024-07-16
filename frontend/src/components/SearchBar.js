import React, { useState } from 'react';

// Example of SearchBar component handling
function SearchBar({ onSearch }) {
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input);  // Passing the input to the parent component to handle
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Search cards..."
            />
            <button type="submit">Search</button>
        </form>
    );
}

