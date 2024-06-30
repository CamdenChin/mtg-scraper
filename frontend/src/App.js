import React, { useState } from 'react';
import CardSearch from './components/CardSearch';
import CardList from './components/CardList';
import Deck from './components/Deck';
import './App.css'; // Assuming you might want to keep your CSS

function App() {
    const [cards, setCards] = useState([]); // To hold the search results

    return (
        <div className="App">
            <header className="App-header">
                <h1>Magic: The Gathering Deck Builder</h1>
                <CardSearch onSearchResults={setCards} />
                <CardList cards={cards} />
                <Deck />
            </header>
        </div>
    );
}

export default App;
