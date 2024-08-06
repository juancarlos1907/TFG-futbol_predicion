def calculate_prediction(
    df,
    home_goal_weight, away_goal_weight,
    possession_weight, passes_weight, saves_weight
):
    # Verificar los pesos
    validate_weights(
        home_goal_weight, away_goal_weight, possession_weight, passes_weight, saves_weight
    )

    # Limitar los goles de casa y de visitante a un máximo de 5
    df['home_goals'] = df['home_goals'].clip(upper=5)
    df['away_goals'] = df['away_goals'].clip(upper=5)
    df['home_goalkeeper_saves'] = df['home_goalkeeper_saves'].clip(upper=5)
    df['away_goalkeeper_saves'] = df['away_goalkeeper_saves'].clip(upper=5)

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

    # Seleccionar solo las columnas numéricas excluyendo 'fixture_id'
    numeric_columns = df.select_dtypes(include=['float64', 'int64']).columns.drop('fixture_id')

    # Calcular la media de cada columna
    column_means = df[numeric_columns].mean()

    # Aplicar la fórmula para cada equipo con pesos personalizados
    home_result = (
        home_goal_weight * column_means['home_goals'] -
        away_goal_weight * column_means['away_goals'] +
        possession_weight * column_means['home_possession%'] +
        passes_weight * column_means['home_passes%'] +
        saves_weight * column_means['home_goalkeeper_saves']
    )

    away_result = (
        away_goal_weight * column_means['away_goals'] -
        home_goal_weight * column_means['home_goals'] +
        possession_weight * column_means['away_possession%'] +
        passes_weight * column_means['away_passes%'] +
        saves_weight * column_means['away_goalkeeper_saves']
    )

    # Multiplicar los resultados por 100 para hacer la diferencia más apreciable
    home_result *= 100
    away_result *= 100

    # Redondear los resultados a 5 decimales
    home_result = round(home_result, 5)
    away_result = round(away_result, 5)

    return home_result, away_result


def validate_weights(home_goal_weight, away_goal_weight, possession_weight, passes_weight, saves_weight):
    # Verificar que cada peso esté en el rango [0, 1]
    if any(weight < 0 or weight > 1 for weight in [
        home_goal_weight, away_goal_weight, possession_weight, passes_weight, saves_weight
    ]):
        raise ValueError("Todos los pesos deben estar en el rango [0, 1].")

    # Verificar que la suma de los pesos sea 1 para cada equipo
    if not (0.999 <= (home_goal_weight + away_goal_weight + possession_weight + passes_weight + saves_weight) <= 1.001):
        raise ValueError("La suma de los pesos debe ser 1.")
