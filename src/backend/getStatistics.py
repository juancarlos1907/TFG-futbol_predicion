import requests
import pandas as pd
import os

# Definir la URL y los headers para la solicitud
url = "https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics"
headers = {
    "X-RapidAPI-Key": "798f80235dmsh5e71f1a0965e5c5p1da281jsn2d6666966440",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
}

# Leer el archivo CSV existente de fixtures
fixtures_df = pd.read_csv('fixtures.csv')

# Verificar si el archivo fixturesWithStatistics.csv existe
if os.path.exists('fixturesWithStatistics.csv'):
    fixtures_with_stats_df = pd.read_csv('fixturesWithStatistics.csv')
    processed_fixtures = set(fixtures_with_stats_df['fixture_id'].unique())
else:
    fixtures_with_stats_df = pd.DataFrame()
    processed_fixtures = set()

# Inicializar una lista para almacenar los datos de las estadísticas
statistics_data = []

# Inicializar el contador
counter = 0
limit = 5

# Procesar cada fixture en el archivo CSV
for _, row in fixtures_df.iterrows():
    fixture_id = row['fixture_id']

    # Verificar si el fixture_id ya ha sido procesado
    if fixture_id in processed_fixtures:
        continue

    # Incrementar el contador y verificar el límite
    if counter >= limit:
        break

    home_team = row['home_team']
    away_team = row['away_team']

    querystring = {"fixture": str(fixture_id)}

    # Realizar la solicitud a la API
    response = requests.get(url, headers=headers, params=querystring)

    if response.status_code == 200:
        response_dict = response.json()
    else:
        print(f"Error: {response.status_code} para fixture {fixture_id}")
        continue

    statistics = response_dict.get("response", [])

    home_stats = {}
    away_stats = {}

    for stat in statistics:
        team = stat.get("team", {})
        team_id = team.get("id")
        team_name = team.get("name")

        for s in stat.get("statistics", []):
            if team_name == home_team:
                home_stats[s["type"]] = s["value"]
            elif team_name == away_team:
                away_stats[s["type"]] = s["value"]

    # Extraer las estadísticas relevantes
    home_possession = home_stats.get("Ball Possession", "0%")
    home_goalkeeper_saves = home_stats.get("Goalkeeper Saves", 0)
    home_passes_percent = home_stats.get("Passes %", "0%")

    away_possession = away_stats.get("Ball Possession", "0%")
    away_goalkeeper_saves = away_stats.get("Goalkeeper Saves", 0)
    away_passes_percent = away_stats.get("Passes %", "0%")

    # Crear un diccionario con los datos combinados
    combined_data = {
        "fixture_id": fixture_id,
        "home_team": home_team,
        "home_goals": row['home_goals'],
        "home_possession%": home_possession,
        "home_goalkeeper_saves": home_goalkeeper_saves,
        "home_passes%": home_passes_percent,
        "away_team": away_team,
        "away_goals": row['away_goals'],
        "away_possession%": away_possession,
        "away_goalkeeper_saves": away_goalkeeper_saves,
        "away_passes%": away_passes_percent
    }

    statistics_data.append(combined_data)

    # Incrementar el contador después de la llamada exitosa
    counter += 1

# Convertir la lista de diccionarios a un DataFrame
new_statistics_df = pd.DataFrame(statistics_data)

# Concatenar el nuevo DataFrame con el existente si existe
if not fixtures_with_stats_df.empty:
    updated_df = pd.concat([fixtures_with_stats_df, new_statistics_df], ignore_index=True)
else:
    updated_df = new_statistics_df

# Guardar el DataFrame actualizado en un archivo CSV
updated_df.to_csv('fixturesWithAllStatistics.csv', index=False)
