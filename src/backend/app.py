from flask import Flask, jsonify
from flask_cors import CORS
import requests
import pandas as pd
from datetime import datetime

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
    # Lee el archivo CSV
    teams_df = pd.read_csv('teams.csv')

    # Obtiene el año actual
    current_year = datetime.now().year

    # Filtra los equipos del año actual -1 porque el listado es hasta 2023 y faltan datos del 24
    current_teams = teams_df[teams_df['year'] == current_year-1]

    # Selecciona las columnas necesarias
    teams_info = current_teams[['name', 'logo', 'country']]

    # Convierte el DataFrame a una lista de diccionarios
    teams_list = teams_info.to_dict(orient='records')

    # Retorna los datos como JSON
    return jsonify(teams_list)

    # response = requests.get(f"{API_FOOTBALL_URL}teams", headers=API_FOOTBALL_HEADERS)
    # data = response.json()
    # return jsonify(data)

@app.route('/api/fixtures', methods=['GET'])
def get_fixtures():
    response = requests.get(f"{API_FOOTBALL_URL}fixtures", headers=API_FOOTBALL_HEADERS)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)