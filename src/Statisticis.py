import pandas as pd
import requests

# Leer el archivo CSV existente
df = pd.read_csv('matches2.csv')

# Limitar a las tres primeras líneas para pruebas
df = df.head(10)

# Mostrar el DataFrame para verificar
print(df)

api_key = "798f80235dmsh5e71f1a0965e5c5p1da281jsn2d6666966440"
api_host = "api-football-v1.p.rapidapi.com"
url = "https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics"


# Función para obtener estadísticas del partido
def get_match_statistics(match_id):
    headers = {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': api_host
    }

    params = {"fixture": match_id}

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return None


# Obtener estadísticas para cada partido
statistics = []
for match_id in df['match_id']:
    stats = get_match_statistics(match_id)
    statistics.append(stats)

# Mostrar estadísticas para verificar
print(statistics)


# Función para extraer estadísticas relevantes de cada equipo
# Función para extraer estadísticas relevantes de cada equipo
def extract_team_statistics(stats):
    team_statistics = {}

    if stats and 'response' in stats:
        for team_stats in stats['response']:
            team_name = team_stats['team']['name']
            statistics = team_stats['statistics']
            team_statistics[team_name] = {}
            for stat in statistics:
                if stat['type'] in ['Passes %', 'Goalkeeper Saves', 'Ball Possession']:
                    team_statistics[team_name][stat['type']] = stat['value']
    return team_statistics


# Extraer estadísticas para cada partido
extracted_stats = [extract_team_statistics(stat) for stat in statistics]

# Mostrar estadísticas extraídas para verificar
print(extracted_stats)

# Obtener estadísticas de cada equipo por separado
home_team_stats = [{'match_id': match_id, 'Home Team': home_team, 'Home Goals': home_goals, **stats.get(home_team, {})}
                   for match_id, stats, home_team, home_goals in
                   zip(df['match_id'], extracted_stats, df['home_team'], df['home_goals'])]
away_team_stats = [{'match_id': match_id, 'Away Team': away_team, 'Away Goals': away_goals, **stats.get(away_team, {})}
                   for match_id, stats, away_team, away_goals in
                   zip(df['match_id'], extracted_stats, df['away_team'], df['away_goals'])]

# Convertir a DataFrame
home_team_df = pd.DataFrame(home_team_stats)
away_team_df = pd.DataFrame(away_team_stats)

# Mostrar los DataFrames para verificar
print(home_team_df)
print(away_team_df)

# Unir los DataFrames de los equipos en uno solo
final_df = pd.merge(home_team_df, away_team_df, on='match_id')

# Mostrar el DataFrame final para verificar
print(final_df)

# Guardar el DataFrame final en un archivo CSV
final_df.to_csv('matches_with_selected_statistics.csv', index=False)

# Obtener estadísticas para cada partido
# statistics = []
# for match_id in df['match_id']:
#     stats = get_match_statistics(match_id)
#     statistics.append(stats)
#
# def extract_statistics(stats):
#     # Inicializar los valores
#     passes_percentage = None
#     goalkeeper_saves = None
#     ball_possession = None
#
#     if stats and 'response' in stats:
#         for team_stats in stats['response']:
#             statistics = team_stats['statistics']
#             for stat in statistics:
#                 if stat['type'] == 'Passes %':
#                     passes_percentage = stat['value']
#                 elif stat['type'] == 'Goalkeeper Saves':
#                     goalkeeper_saves = stat['value']
#                 elif stat['type'] == 'Ball Possession':
#                     ball_possession = stat['value']
#
#     return passes_percentage, goalkeeper_saves, ball_possession
#
#
# # Extraer estadísticas para cada partido
# extracted_stats = [extract_statistics(stat) for stat in statistics]
#
# # Añadir columnas al DataFrame
# df['Passes %'] = [stat[0] for stat in extracted_stats]
# df['Goalkeeper Saves'] = [stat[1] for stat in extracted_stats]
# df['Ball Possession'] = [stat[2] for stat in extracted_stats]
#
# # Mostrar el DataFrame actualizado para verificar
# print(df)
#
#
# # Guardar el DataFrame actualizado en un archivo CSV
# df.to_csv('matches_with_statistics.csv', index=False)