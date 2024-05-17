import pandas as pd
from sklearn.preprocessing import normalize

# Cargamos los datos del archivo CSV
df = pd.read_csv("matches_with_selected_statistics.csv")

# Seleccionamos las columnas relevantes
relevant_columns = ['match_id', 'Home Team', 'Home Goals', 'Ball Possession_x', 'Goalkeeper Saves_x', 'Passes %_x',
                    'Away Team', 'Away Goals', 'Ball Possession_y', 'Goalkeeper Saves_y', 'Passes %_y']
df = df[relevant_columns]

# Eliminamos el signo "%" de las columnas de posesión
df['Ball Possession_x'] = df['Ball Possession_x'].str.rstrip('%').astype('float')
df['Ball Possession_y'] = df['Ball Possession_y'].str.rstrip('%').astype('float')
df['Passes %_x'] = df['Passes %_x'].str.rstrip('%').astype('float')
df['Passes %_y'] = df['Passes %_y'].str.rstrip('%').astype('float')

# Normalizamos los datos de cada equipo
teams = ['Home', 'Away']
for team in teams:
    goals_col = f'{team} Goals'

teams = ['x', 'y']
for team in teams:
    possession_col = f'Ball Possession_{team.lower()}'
    saves_col = f'Goalkeeper Saves_{team.lower()}'
    passes_col = f'Passes %_{team.lower()}'

    # Normalizamos los goles
    df[f'{team} Goals Normalized'] = normalize(df[[goals_col]].values, axis=0) * 5

    # Normalizamos la posesión
    df[f'{team} Ball Possession Normalized'] = normalize(df[[possession_col]].values, axis=0) * 5

    # Normalizamos los guardametas
    df[f'{team} Goalkeeper Saves Normalized'] = normalize(df[[saves_col]].values, axis=0) * 5

    # Normalizamos los pases
    df[f'{team} Passes % Normalized'] = normalize(df[[passes_col]].values, axis=0) * 5

# Mostramos el DataFrame con las nuevas columnas normalizadas
print(df.head())

# Guardamos el DataFrame modificado en un archivo CSV
df.to_csv("matches_statistics_modified.csv", index=False)

print("Archivo CSV guardado correctamente.")