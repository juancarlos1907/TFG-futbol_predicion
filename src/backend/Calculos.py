def calculate_prediction(df):
    # Eliminamos el signo "%" de las columnas de posesión
    df['home_possession%'] = df['home_possession%'].str.rstrip('%').astype('float')
    df['away_possession%'] = df['away_possession%'].str.rstrip('%').astype('float')
    df['home_passes%'] = df['home_passes%'].str.rstrip('%').astype('float')
    df['away_passes%'] = df['away_passes%'].str.rstrip('%').astype('float')

    # Normalizar las columnas de porcentaje de 0 a 5
    df['home_possession%'] = df['home_possession%'] / 100 * 5
    df['away_possession%'] = df['away_possession%'] / 100 * 5
    df['home_passes%'] = df['home_passes%'] / 100 * 5
    df['away_passes%'] = df['away_passes%'] / 100 * 5

    # Seleccionar solo las columnas numéricas excluyendo 'match_id'
    numeric_columns = df.select_dtypes(include=['float64', 'int64']).columns.drop('fixture_id')

    # Calcular la media de cada columna
    column_means = df[numeric_columns].mean()

    # Aplicar la fórmula para cada equipo
    home_result = 0.35 * column_means['home_goals'] - 0.35 * column_means['away_goals'] + 0.15 * column_means['home_possession%'] + 0.1 * column_means['home_passes%'] + 0.05 * column_means['home_goalkeeper_saves']
    away_result = 0.35 * column_means['away_goals'] - 0.35 * column_means['home_goals'] + 0.15 * column_means['away_possession%'] + 0.1 * column_means['away_passes%'] + 0.05 * column_means['away_goalkeeper_saves']

    # Obtener los nombres de los equipos
    home_team = df.loc[0, 'home_team']
    away_team = df.loc[0, 'away_team']

    # Imprimir los resultados con los nombres de los equipos
    print("Resultado para", home_team + ":", home_result)
    print("Resultado para", away_team + ":", away_result)

    return home_result, away_result
