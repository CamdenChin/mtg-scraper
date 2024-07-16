const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

// Set up database
const db = new sqlite3.Database('./mtg_cards.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// Function to insert or update card data
const upsertCard = (card) => {
    const query = `
        INSERT INTO cards (id, name, mana_cost, type, rarity, text, set_name, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            name=excluded.name,
            mana_cost=excluded.mana_cost,
            type=excluded.type,
            rarity=excluded.rarity,
            text=excluded.text,
            set_name=excluded.set_name,
            image_url=excluded.image_url;
    `;
    const params = [
        card.id,
        card.name,
        card.mana_cost,
        card.type_line,
        card.rarity,
        card.oracle_text,
        card.set_name,
        card.image_uris ? card.image_uris.normal : ''
    ];

    db.run(query, params, (err) => {
        if (err) {
            console.error('Error upserting card:', err);
        } else {
            console.log('Card upserted:', card.name);
        }
    });
};

// Function to fetch cards from Scryfall API
const fetchCards = async (page = 1) => {
    try {
        const response = await axios.get(`https://api.scryfall.com/cards/search?q=*&page=${page}`);
        const cards = response.data.data;
        
        cards.forEach((card) => {
            if (card.image_uris) {
                upsertCard(card);
            }
        });

        if (response.data.has_more) {
            fetchCards(page + 1);
        } else {
            console.log('All cards fetched and upserted.');
        }
    } catch (error) {
        console.error('Error fetching cards from Scryfall:', error);
    }
};

// Start fetching cards
fetchCards();
