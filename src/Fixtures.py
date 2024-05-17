import http.client
import json
import csv
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

#Solicitud api
conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")

headers = {
    'X-RapidAPI-Key': "798f80235dmsh5e71f1a0965e5c5p1da281jsn2d6666966440",
    'X-RapidAPI-Host': "api-football-v1.p.rapidapi.com"
}

conn.request("GET", "/v3/fixtures/headtohead?h2h=536-543&from=2016-01-01&to=2024-05-16", headers=headers)

res = conn.getresponse()
data = res.read()

#Convierte en diccionario
data_dict = json.loads(data)

#Crear una lista para almacenar los datos de los partidos
matches = []

#Extraer informacion
fixtures = data_dict.get('response', [])

for fixture in fixtures:
    match_id = fixture.get('fixture', {}).get('id')
    home_team = fixture.get('teams', {}).get('home', {}).get('name')
    away_team = fixture.get('teams', {}).get('away', {}).get('name')
    home_goals = fixture.get('goals', {}).get('home')
    away_goals = fixture.get('goals', {}).get('away')

#Almacenar informacion
    match_data = {
        'match_id': match_id,
        'home_team': home_team,
        'away_team': away_team,
        'home_goals': home_goals,
        'away_goals': away_goals
    }

    matches.append(match_data)

    #Imprimir los datos almacenados
    for match in matches:
        print(f"Match ID: {match['match_id']}")
        print(f"{match['home_team']} vs {match['away_team']}")
        print(f"Goals: {match['home_team']} {match['home_goals']} - {match['away_goals']} {match['away_team']}")
        print("-" * 20)

    # Guardar los datos en un archivo CSV
    with open('matches2.csv', 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=['match_id', 'home_team', 'away_team', 'home_goals', 'away_goals'])
        writer.writeheader()
        for match in matches:
            writer.writerow(match)


# Leer los datos desde el archivo CSV
df = pd.read_csv('matches2.csv')

# Mostrar los primeros 5 registros
print(df.head())

# Analizar los datos
print(df.describe())

# Ejemplo de análisis: cantidad total de goles por equipo
total_goals = df.groupby('home_team')['home_goals'].sum() + df.groupby('away_team')['away_goals'].sum()
print(total_goals)


# Leer los datos desde el archivo CSV
df = pd.read_csv('matches2.csv')

# Convertir las columnas de goles a enteros
# df['home_goals'] = df['home_goals'].astype(int)
# df['away_goals'] = df['away_goals'].astype(int)
#
# # Crear un gráfico de barras de los goles
# plt.figure(figsize=(10, 6))
# sns.barplot(x='home_team', y='home_goals', data=df, ci=None, label='Home Goals')
# sns.barplot(x='away_team', y='away_goals', data=df, ci=None, label='Away Goals')
#
# plt.xticks(rotation=45)
# plt.xlabel('Teams')
# plt.ylabel('Goals')
# plt.title('Goals Scored by Home and Away Teams')
# plt.legend()
# plt.show()

#print(data.decode("utf-8"))