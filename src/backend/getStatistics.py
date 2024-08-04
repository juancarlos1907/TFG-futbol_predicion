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
if os.path.exists('fixturesWithAllStatistics.csv'):
    fixtures_with_stats_df = pd.read_csv('fixturesWithAllStatistics.csv')
    # Imprimir los primeros valores para depuración
    print("Primeros valores de 'fixture_id' en fixtures_with_stats_df:")
    print(fixtures_with_stats_df['fixture_id'].head())

    # Asegurarse de que 'fixture_id' es de tipo entero o cadena
    fixtures_with_stats_df['fixture_id'] = fixtures_with_stats_df['fixture_id'].astype(str)

    # Obtener los fixture_id únicos
    processed_fixtures = set(fixtures_with_stats_df['fixture_id'].unique())
else:
    fixtures_with_stats_df = pd.DataFrame()
    processed_fixtures = set()

print(f"Fixtures procesados previamente: {len(processed_fixtures)}")

# Filtrar solo los fixtures que aún no tienen estadísticas
fixtures_to_process_df = fixtures_df[~fixtures_df['fixture_id'].astype(str).isin(processed_fixtures)]

# Inicializar una lista para almacenar los datos de las estadísticas
statistics_data = []

# Inicializar el contador
counter = 0
limit = 50

# Procesar cada fixture en el archivo CSV
for _, row in fixtures_df.iterrows():
    fixture_id = row['fixture_id']

    # Incrementar el contador y verificar el límite
    if counter > limit:
        print("Límite de solicitudes alcanzado.")
        break

    home_team = row['home_team']
    away_team = row['away_team']

    querystring = {"fixture": str(fixture_id)}

    # Realizar la solicitud a la API
    response = requests.get(url, headers=headers, params=querystring)

    try:
        response.raise_for_status()
    except requests.exceptions.HTTPError as err:
        print(f"Error: {err} para fixture {fixture_id}")
        continue

    # Procesar la respuesta de la API
    response_dict = response.json()
    statistics = response_dict.get("response", [])

    if not statistics:
        print(f"No se encontraron estadísticas para fixture {fixture_id}.")
        continue

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

# Filtrar solo los datos nuevos antes de concatenar
new_statistics_df = new_statistics_df[~new_statistics_df['fixture_id'].isin(processed_fixtures)]

# Concatenar el nuevo DataFrame con el existente si existe
if not fixtures_with_stats_df.empty:
    updated_df = pd.concat([fixtures_with_stats_df, new_statistics_df], ignore_index=True)
else:
    updated_df = new_statistics_df

# Guardar el DataFrame actualizado en un archivo CSV
updated_df.to_csv('fixturesWithAllStatistics.csv', index=False)
