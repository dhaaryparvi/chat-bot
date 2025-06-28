from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Enable frontend to access backend

@app.route("/search", methods=["POST"])
def search():
    query = request.json.get("query", "").lower()

    conn = sqlite3.connect("products.db")
    cursor = conn.cursor()

    # Search products by name
    cursor.execute("SELECT name, price, category FROM products WHERE LOWER(name) LIKE ?", (f"%{query}%",))
    results = cursor.fetchall()
    conn.close()

    return jsonify({"results": results})

if __name__ == "__main__":
    app.run(debug=True)
