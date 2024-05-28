from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5000"}})

API_FOOTBALL_URL = "https://api-football-v1.p.rapidapi.com/v3/"
API_FOOTBALL_HEADERS = {
    'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
    'x-rapidapi-key': "YOUR_RAPIDAPI_KEY"  # Reemplaza con tu clave de API
}

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the API"

@app.route('/api/teams', methods=['GET'])
def get_teams():
    response = requests.get(f"{API_FOOTBALL_URL}teams", headers=API_FOOTBALL_HEADERS)
    data = response.json()
    return jsonify(data)

@app.route('/api/fixtures', methods=['GET'])
def get_fixtures():
    response = requests.get(f"{API_FOOTBALL_URL}fixtures", headers=API_FOOTBALL_HEADERS)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)