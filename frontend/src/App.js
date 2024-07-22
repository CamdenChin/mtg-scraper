import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardSearch from './components/CardSearch';
import CardList from './components/CardList';
import Deck from './components/Deck';
import CardDetail from './components/CardDetail';
import './App.css'; // Assuming you might want to keep your CSS

function App() {
    const [cards, setCards] = useState([]); // To hold the search results

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Magic: The Gathering Deck Builder</h1>
                    <CardSearch onSearchResults={setCards} />
                    <Routes>
                        <Route path="/" element={<CardList cards={cards} />} />
                        <Route path="/card/:cardId" element={<CardDetail />} /> {/* Define the route for card detail */}
                    </Routes>
                    <Deck />
                </header>
            </div>
        </Router>
    );
}

export default App;

