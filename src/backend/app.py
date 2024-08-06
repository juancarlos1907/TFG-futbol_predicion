from collections import OrderedDict

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import pandas as pd
from datetime import datetime
import os

from Calculos import calculate_team_result, calculate_team_statistics, calculate_prediction
from ResultManager import result_manager

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
    print(len(current_teams))

    # Selecciona las columnas necesarias
    teams_info = current_teams[['name', 'logo', 'country']]

    # Convierte el DataFrame a una lista de diccionarios
    teams_list = teams_info.to_dict(orient='records')

    print(len(teams_list))
    #print(teams_list)
    # Retorna los datos como JSON
    return jsonify(teams_list)


@app.route('/api/fixtures/<string:home_team>/<string:away_team>', methods=['GET'])
def get_fixtures(home_team, away_team):
    # Cargar el archivo CSV en un DataFrame de pandas
    try:
        df = pd.read_csv('fixtures.csv')
    except FileNotFoundError:
        return jsonify({"error": "El archivo fixtures.csv no se encuentra"}), 404

    # Asegurarse de que las columnas relevantes existen
    if 'home_team' not in df.columns or 'away_team' not in df.columns:
        return jsonify({"error": "El archivo CSV no contiene las columnas necesarias"}), 400

    # Limpiar espacios en blanco alrededor de los nombres de los equipos
    df['home_team'] = df['home_team'].str.strip()
    df['away_team'] = df['away_team'].str.strip()

    # Imprimir las primeras filas para depuración
    print(df.head())

    # Imprimir los nombres de los equipos recibidos
    print(f"Home Team: {home_team}, Away Team: {away_team}")

    # Filtrar los partidos en los que los dos equipos especificados jugaron
    matches = df[((df['home_team'] == home_team) & (df['away_team'] == away_team)) |
                 ((df['home_team'] == away_team) & (df['away_team'] == home_team))]

    # Imprimir el resultado del filtrado
    print(matches)

    matches_list = matches.to_dict(orient='records')

    # Retorna los datos como JSON
    return jsonify(matches_list)

@app.route('/api/fixture/statistics/<string:fixture_ids>', methods=['GET'])
def get_statistics(fixture_ids):
    # Convertir los IDs de los partidos en una lista de enteros
    fixture_ids_list = list(map(int, fixture_ids.split(',')))

    # Cargar el archivo CSV de estadísticas en un DataFrame de pandas
    df_statistics = pd.read_csv('fixturesWithStatistics.csv')

    # Filtrar las estadísticas de los partidos seleccionados
    selected_statistics = df_statistics[df_statistics['fixture_id'].isin(fixture_ids_list)]

    return selected_statistics.to_dict(orient='records')


@app.route('/api/fixture/statistics/<string:home_team>/<string:away_team>', methods=['GET'])
def get_prediction(home_team, away_team):
    # Cargar el archivo CSV de estadísticas en un DataFrame de pandas
    df_statistics = pd.read_csv('fixturesWithStatistics.csv')

    # Filtrar los partidos que involucren a los equipos proporcionados
    selected_statistics = df_statistics[
        ((df_statistics['home_team'] == home_team) & (df_statistics['away_team'] == away_team)) |
        ((df_statistics['home_team'] == away_team) & (df_statistics['away_team'] == home_team))
    ]

    # Si no hay estadísticas, retornar un mensaje
    if selected_statistics.empty:
        return jsonify({"message": "No se encontraron partidos para estos equipos."}), 404

    # Comprobar si hay suficientes enfrentamientos
    if selected_statistics.shape[0] < 1:
        return jsonify({"message": "No tenemos suficientes datos para proporcionar un resultado fiable."}), 400

    # Convertir las estadísticas seleccionadas a un DataFrame
    stats_df = pd.DataFrame(selected_statistics.to_dict(orient='records'))

    # Obtener los parámetros de pesos de la solicitud GET
    try:
        home_goal_weight = float(request.args.get('home_goal_weight', 0.35))
        away_goal_weight = float(request.args.get('away_goal_weight', 0.35))
        possession_weight = float(request.args.get('possession_weight', 0.15))
        passes_weight = float(request.args.get('passes_weight', 0.1))
        saves_weight = float(request.args.get('saves_weight', 0.05))
    except ValueError:
        return jsonify({"message": "Los pesos deben ser valores numéricos."}), 400

    # Verificar los pesos y calcular la predicción
    try:
        home_result, away_result, column_means = calculate_prediction(
            stats_df,
            home_team, away_team,
            home_goal_weight, away_goal_weight,
            possession_weight, passes_weight, saves_weight
        )
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

    # Determinar el equipo ganador usando la clase
    winner = result_manager.determine_winner(home_team, away_team, home_result, away_result)

    # Guardar el resultado en el archivo CSV
    result_manager.save_result_to_csv(home_team, away_team, home_result, away_result, winner)

    response = OrderedDict([
        ("column_means", column_means),
        ("home_team_result", f"{home_team} - {home_result}"),
        ("away_team_result", f"{away_team} - {away_result}"),
        ("winner", winner)
    ])

    return jsonify(response)

@app.route('/api/fixture/statistics/recent', methods=['GET'])
def get_recent_results():
    # Obtener los últimos 10 resultados del archivo CSV
    recent_results_df = result_manager.get_last_n_results(10)

    # Si el DataFrame está vacío, retornar un mensaje
    if recent_results_df.empty:
        return jsonify({"message": "No hay resultados disponibles."}), 404

    # Invertir el orden de los resultados
    recent_results_df = recent_results_df.iloc[::-1]

    # Convertir el DataFrame a una lista de diccionarios para JSON
    recent_results = recent_results_df.to_dict(orient='records')

    return jsonify(recent_results)

if __name__ == '__main__':
    app.run(debug=True)
