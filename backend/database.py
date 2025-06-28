import sqlite3

# Generate 100 mock products
products = [(f"Product {i}", f"{10 + i * 2}$", "Category A") for i in range(100)]

# Connect to database
conn = sqlite3.connect("products.db")
cursor = conn.cursor()

# Create table
cursor.execute("CREATE TABLE IF NOT EXISTS products (name TEXT, price TEXT, category TEXT)")

# Insert products
cursor.executemany("INSERT INTO products VALUES (?, ?, ?)", products)
conn.commit()
conn.close()

print("Mock products inserted.")
