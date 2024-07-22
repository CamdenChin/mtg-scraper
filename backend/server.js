const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Set up database
const db = new sqlite3.Database('./mtg_cards.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// Creating the table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS cards (
            id TEXT PRIMARY KEY,
            name TEXT,
            mana_cost TEXT,
            type TEXT,
            rarity TEXT,
            text TEXT,
            set_name TEXT,
            image_url TEXT
        )
    `);
    console.log('Table "cards" is created or already exists.');
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/cards', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    console.log(`Page: ${page}, Limit: ${limit}, Offset: ${offset}`); // Log to verify

    db.all('SELECT * FROM cards LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            success: true,
            message: "Cards fetched successfully",
            data: rows
        });
    });
});

app.get('/api/cards/search', (req, res) => {
    const { name, type, rarity, set, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;  // Calculate the offset

    // Base query that excludes entries without an image_url
    let query = `
        SELECT * FROM (
            SELECT *, ROW_NUMBER() OVER (PARTITION BY name ORDER BY id ASC) as rn
            FROM cards
            WHERE image_url IS NOT NULL
    `; 
    const params = [];

    // Dynamically add conditions based on the query parameters provided
    if (name) {
        query += ' AND name LIKE ?';
        params.push(`%${name}%`);
    }
    if (type) {
        query += ' AND type LIKE ?';
        params.push(`%${type}%`);
    }
    if (rarity) {
        query += ' AND rarity = ?';
        params.push(rarity);
    }
    if (set) {
        query += ' AND set_name = ?';
        params.push(set);
    }

    query += `
        ) WHERE rn = 1
        ORDER BY name ASC
        LIMIT ? OFFSET ?
    `;  // Add pagination control to the SQL query
    params.push(parseInt(limit), parseInt(offset));

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ success: false, message: err.message });
        } else {
            res.json({
                success: true,
                message: 'Search results',
                data: rows,
                page: parseInt(page),
                limit: parseInt(limit)
            });
        }
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});