const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./mtg_cards.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error connecting to the database', err.message);
    } else {
        console.log('Connected to the database.');
        db.all("SELECT * FROM cards WHERE name LIKE '%dragon%' AND type LIKE '%creature%'", [], (err, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(rows);
            }
            db.close();
        });
    }
});
