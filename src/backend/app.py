from flask import Flask, jsonify
from flask_cors import CORS
import requests
import pandas as pd
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

API_FOOTBALL_URL = "https://api-football-v1.p.rapidapi.com/v3/"
API_FOOTBALL_HEADERS = {
    'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
    'x-rapidapi-key': "8b45dee1f3msh06016ead9743a2ep1a92bbjsn32b39f9e413b"  # Reemplaza con tu clave de API
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

@app.route('/api/fixtures/<string:home_team>/<string:away_team>', methods=['GET'])
def get_fixtures(home_team, away_team):
    # Cargar el archivo CSV en un DataFrame de pandas
    df = pd.read_csv('fixtures.csv')

    # Filtrar los partidos en los que los dos equipos especificados jugaron
    matches = df[((df['home_team'] == home_team) & (df['away_team'] == away_team)) |
                 ((df['home_team'] == away_team) & (df['away_team'] == home_team))]

    return matches.to_dict(orient='records')

@app.route('/api/fixture/statistics/<string:fixture_ids>', methods=['GET'])
def get_statistics(fixture_ids):
    # Convertir los IDs de los partidos en una lista de enteros
    fixture_ids_list = list(map(int, fixture_ids.split(',')))

    # Cargar el archivo CSV de estadísticas en un DataFrame de pandas
    df_statistics = pd.read_csv('fixturesWithStatistics.csv')

    # Filtrar las estadísticas de los partidos seleccionados
    selected_statistics = df_statistics[df_statistics['fixture_id'].isin(fixture_ids_list)]

    return selected_statistics.to_dict(orient='records')


if __name__ == '__main__':
    app.run(debug=True)
