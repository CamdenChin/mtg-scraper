import sqlite3

# Step 1: Create the database and the table
def create_database():
    conn = sqlite3.connect('mtg_cards.db')
    c = conn.cursor()
    c.execute('DROP TABLE IF EXISTS cards')
    c.execute('''
        CREATE TABLE IF NOT EXISTS cards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
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

# Step 2: Insert card data from the text file into the database
def insert_card_data_from_txt(filename):
    conn = sqlite3.connect('mtg_cards.db')
    c = conn.cursor()

    with open(filename, 'r', encoding='utf-8') as file:
        card_data = {}
        for line in file:
            line = line.strip()
            if line.startswith("Name:"):
                card_data['name'] = line.split("Name: ")[1]
            elif line.startswith("Mana Cost:"):
                card_data['mana_cost'] = line.split("Mana Cost: ")[1]
            elif line.startswith("Type:"):
                card_data['type'] = line.split("Type: ")[1]
            elif line.startswith("Rarity:"):
                card_data['rarity'] = line.split("Rarity: ")[1]
            elif line.startswith("Text:"):
                card_data['text'] = line.split("Text: ")[1]
            elif line.startswith("Set Name:"):
                card_data['set_name'] = line.split("Set Name: ")[1]
            elif line.startswith("Image URL:"):
                card_data['image_url'] = line.split("Image URL: ")[1]
            elif line.startswith("="*40):
                c.execute('''
                    INSERT INTO cards (name, mana_cost, type, rarity, text, set_name, image_url)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (
                    card_data.get('name'),
                    card_data.get('mana_cost'),
                    card_data.get('type'),
                    card_data.get('rarity'),
                    card_data.get('text'),
                    card_data.get('set_name'),
                    card_data.get('image_url')
                ))
                card_data = {}

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_database()
    insert_card_data_from_txt('all_magic_cards.txt')
    print("Data has been inserted into mtg_cards.db")