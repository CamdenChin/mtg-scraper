import sqlite3
import requests

def create_database():
    """Create the SQLite database and cards table."""
    conn = sqlite3.connect('mtg_cards.db')
    with conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS cards (
                id TEXT PRIMARY KEY,
                name TEXT,
                mana_cost TEXT,
                type TEXT,
                rarity TEXT,
                text TEXT,
                set_name TEXT,
                image_url TEXT
            );
        ''')
    print("Database and table created successfully")

def insert_card_data(cards):
    """Insert card data into the database."""
    conn = sqlite3.connect('mtg_cards.db')
    with conn:
        for card in cards:
            conn.execute('''
                INSERT OR IGNORE INTO cards (
                    id, name, mana_cost, type, rarity, text, set_name, image_url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            ''', (
                card['id'],
                card['name'],
                card.get('mana_cost', ''),
                card['type_line'],
                card['rarity'],
                card.get('oracle_text', ''),
                card['set'],
                card['image_uris'].get('normal') if 'image_uris' in card else None
            ))
    print(f"Inserted {len(cards)} cards into the database")

def fetch_all_cards():
    """Fetch all cards from the Scryfall API."""
    url = "https://api.scryfall.com/cards/search"
    query = {"q": "game:paper"}  # Fetches only cards available in paper format
    all_cards = []

    while url:
        response = requests.get(url, params=query)
        data = response.json()
        if 'data' not in data:
            print("No data found, ending fetch.")
            break
        all_cards.extend(data['data'])
        url = data.get('next_page')  # Continue to next page if available
        print(f"Fetched {len(data['data'])} cards, total: {len(all_cards)}")

    return all_cards

if __name__ == "__main__":
    create_database()
    all_cards = fetch_all_cards()
    if all_cards:
        insert_card_data(all_cards)
    print("Data fetching and storage process completed.")
