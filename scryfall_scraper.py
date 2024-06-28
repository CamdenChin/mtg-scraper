import sqlite3
import requests

# Step 1: Create the database and the table
def create_database():
    conn = sqlite3.connect('mtg_cards.db')
    c = conn.cursor()
    c.execute('''
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
    ''')
    conn.commit()
    conn.close()

# Step 2: Insert card data into the database
def insert_card_data(cards):
    conn = sqlite3.connect('mtg_cards.db')
    c = conn.cursor()

    for card in cards:
        c.execute('''
            INSERT OR IGNORE INTO cards (id, name, mana_cost, type, rarity, text, set_name, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            card['id'],
            card['name'],
            card.get('mana_cost', ''),
            card['type_line'],
            card['rarity'],
            card.get('oracle_text', ''),
            card['set'],
            card['image_uris']['normal'] if 'image_uris' in card else ''
        ))

    conn.commit()
    conn.close()

# Step 3: Fetch all cards from Scryfall API
def fetch_all_cards():
    url = "https://api.scryfall.com/cards/search"
    query = {"q": "game:paper"}
    all_cards = []

    while url:
        response = requests.get(url, params=query)
        data = response.json()
        all_cards.extend(data['data'])
        url = data.get('next_page')
        print(f"Fetched {len(data['data'])} cards, total: {len(all_cards)}")

    return all_cards

if __name__ == "__main__":
    create_database()
    all_cards = fetch_all_cards()
    insert_card_data(all_cards)
    print(f"Saved {len(all_cards)} cards to mtg_cards.db")