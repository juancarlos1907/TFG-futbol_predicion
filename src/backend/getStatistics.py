import requests
import pandas as pd
import os
import time

# Definir la URL y los headers para la solicitud
url = "https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics"
headers = {
    "X-RapidAPI-Key": "798f80235dmsh5e71f1a0965e5c5p1da281jsn2d6666966440",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
}

# Leer el archivo CSV existente de fixtures
fixtures_df = pd.read_csv('fixtures.csv')

# Verificar si el archivo fixturesWithAllStatistics.csv existe
if os.path.exists('fixturesWithAllStatistics.csv'):
    fixtures_with_stats_df = pd.read_csv('fixturesWithAllStatistics.csv')
    # Imprimir los primeros valores para depuración
    print("Primeros valores de 'fixture_id' en fixtures_with_stats_df:")
    print(fixtures_with_stats_df['fixture_id'].head())

    # Asegurarse de que 'fixture_id' es de tipo entero o cadena
    fixtures_with_stats_df['fixture_id'] = fixtures_with_stats_df['fixture_id'].astype(str)

    # Obtener los fixture_id únicos ya procesados
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
limit = 10
retry_count = 0
max_retries = 5

# Procesar cada fixture en el DataFrame filtrado
for _, row in fixtures_to_process_df.iterrows():
    fixture_id = row['fixture_id']

    # Incrementar el contador y verificar el límite
    if counter >= limit:
        print("Límite de solicitudes alcanzado.")
        break

    home_team = row['home_team']
    away_team = row['away_team']

    querystring = {"fixture": str(fixture_id)}

    while retry_count < max_retries:
        try:
            # Realizar la solicitud a la API
            response = requests.get(url, headers=headers, params=querystring)
            response.raise_for_status()

            response_dict = response.json()
            statistics = response_dict.get("response", [])

            if not statistics:
                print(f"No se encontraron estadísticas para fixture {fixture_id}.")
                counter+=1
                break

            home_stats = {}
            away_stats = {}

            for stat in statistics:
                team = stat.get("team", {})
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
            retry_count = 0  # Resetear el contador de reintentos si la solicitud es exitosa
            break  # Salir del bucle while después de una solicitud exitosa

        except requests.exceptions.HTTPError as err:
            if response.status_code == 429:
                print(f"Error 429: Too Many Requests para fixture {fixture_id}. Esperando antes de reintentar...")
                retry_count += 3
                wait_time = 3 ** retry_count  # Tiempo de espera exponencial
                time.sleep(wait_time)
            else:
                print(f"Error: {err} para fixture {fixture_id}")
                break  # Salir del bucle while en caso de otros errores HTTP

# Convertir la lista de datos a un DataFrame
new_statistics_df = pd.DataFrame(statistics_data)

print("Columnas en fixtures_with_stats_df:", fixtures_with_stats_df.columns)
print("Columnas en new_statistics_df:", new_statistics_df.columns)

# Concatenar el nuevo DataFrame con el existente si existe
if not fixtures_with_stats_df.empty:
    updated_df = pd.concat([fixtures_with_stats_df, new_statistics_df], ignore_index=True)
else:
    updated_df = new_statistics_df

# Guardar el DataFrame actualizado en un archivo CSV
try:
    updated_df.to_csv('fixturesWithAllStatistics.csv', index=False)
    print("Archivo CSV guardado exitosamente.")
except IOError as e:
    print(f"Error al guardar el archivo CSV: {e}")
