import pandas as pd

#Cargamos los datos del archivo CSV
df = pd.read_csv("matches_with_selected_statistics.csv")

# Eliminamos el signo "%" de las columnas de posesión
df['Ball Possession_x'] = df['Ball Possession_x'].str.rstrip('%').astype('float')
df['Ball Possession_y'] = df['Ball Possession_y'].str.rstrip('%').astype('float')
df['Passes %_x'] = df['Passes %_x'].str.rstrip('%').astype('float')
df['Passes %_y'] = df['Passes %_y'].str.rstrip('%').astype('float')

# Normalizar las columnas de porcentaje de 0 a 5
df['Ball Possession_x'] = df['Ball Possession_x'] / 100 * 5
df['Ball Possession_y'] = df['Ball Possession_y'] / 100 * 5
df['Passes %_x'] = df['Passes %_x'] / 100 * 5
df['Passes %_y'] = df['Passes %_y'] / 100 * 5

# Seleccionar solo las columnas numéricas excluyendo 'match_id'
numeric_columns = df.select_dtypes(include=['float64', 'int64']).columns.drop('match_id')

# Calcular la media de cada columna
column_means = df[numeric_columns].mean()

# Aplicar la fórmula para cada equipo
home_result = 0.35 * column_means['Home Goals'] - 0.35 * column_means['Away Goals'] + 0.15 * column_means['Ball Possession_x'] + 0.1 * column_means['Passes %_x'] + 0.05 * column_means['Goalkeeper Saves_x']
away_result = 0.35 * column_means['Away Goals'] - 0.35 * column_means['Home Goals'] + 0.15 * column_means['Ball Possession_y'] + 0.1 * column_means['Passes %_y'] + 0.05 * column_means['Goalkeeper Saves_y']

# Obtener los nombres de los equipos
home_team = df.loc[0, 'Home Team']
away_team = df.loc[0, 'Away Team']

# Imprimir los resultados con los nombres de los equipos
print("Resultado para", home_team + ":", home_result)
print("Resultado para", away_team + ":", away_result)





