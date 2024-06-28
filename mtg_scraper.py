import sqlite3
import certifi
import urllib.request
from mtgsdk import Card

# Step 1: Create the database and the table
def create_database():
    conn = sqlite3.connect('mtg_cards.db')
    c = conn.cursor()
    # Drop the existing table if it exists
    c.execute('DROP TABLE IF EXISTS cards')
    # Create the table with the new schema
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
        ''', (card.id, card.name, card.mana_cost, card.type, card.rarity, card.text, card.set_name, card.image_url))

    conn.commit()
    conn.close()

# Step 3: Save card data to a text file
def save_card_data_to_file(cards, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        for card in cards:
            file.write(f"Name: {card.name}\n")
            file.write(f"Mana Cost: {card.mana_cost}\n")
            file.write(f"Type: {card.type}\n")
            file.write(f"Rarity: {card.rarity}\n")
            file.write(f"Text: {card.text}\n")
            file.write(f"Set Name: {card.set_name}\n")
            file.write(f"Image URL: {card.image_url}\n")
            file.write("="*40 + "\n")

# Step 4: Fetch all cards
def fetch_all_cards():
    page = 1
    all_cards = []

    while True:
        cards = Card.where(page=page).where(pageSize=100).all()
        if not cards:
            break
        all_cards.extend(cards)
        print(f"Fetched page {page} with {len(cards)} cards.")
        page += 1

    return all_cards

if __name__ == "__main__":
    # Set SSL context to use certifi
    context = urllib.request.ssl.create_default_context(cafile=certifi.where())
    urllib.request.install_opener(urllib.request.build_opener(urllib.request.HTTPSHandler(context=context)))

    create_database()
    all_cards = fetch_all_cards()
    insert_card_data(all_cards)
    save_card_data_to_file(all_cards, 'all_magic_cards.txt')
    print(f"Saved {len(all_cards)} cards to mtg_cards.db and all_magic_cards.txt")