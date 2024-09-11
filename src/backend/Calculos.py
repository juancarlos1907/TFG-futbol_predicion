import pandas as pd
def validate_weights(home_goal_weight, away_goal_weight, possession_weight, passes_weight, saves_weight):
    # Verificar que cada peso esté en el rango [0, 1]
    if any(weight < 0 or weight > 1 for weight in [
        home_goal_weight, away_goal_weight, possession_weight, passes_weight, saves_weight
    ]):
        raise ValueError("Todos los pesos deben estar en el rango [0, 1].")

    # Verificar que la suma de los pesos sea 1 para cada equipo
    if not (0.999 <= (home_goal_weight + away_goal_weight + possession_weight + passes_weight + saves_weight) <= 1.001):
        raise ValueError("La suma de los pesos debe ser 1.")

def calculate_team_statistics(df, team):
    """Calcula las estadísticas promedio para un equipo, independientemente de si es local o visitante."""
    home_stats = df[df['home_team'] == team].copy()
    away_stats = df[df['away_team'] == team].copy()

    # Convertir las estadísticas al mismo formato
    if not home_stats.empty:
        home_stats = home_stats.rename(columns={
            'home_goals': 'goals',
            'home_possession%': 'possession%',
            'home_goalkeeper_saves': 'goalkeeper_saves',
            'home_passes%': 'passes%'
        })

    if not away_stats.empty:
        away_stats = away_stats.rename(columns={
            'away_goals': 'goals',
            'away_possession%': 'possession%',
            'away_goalkeeper_saves': 'goalkeeper_saves',
            'away_passes%': 'passes%'
        })

    # Combinar las estadísticas de local y visitante
    all_stats = pd.concat([home_stats, away_stats], ignore_index=True)

    # Asegurar que el DataFrame no esté vacío antes de calcular las medias
    if all_stats.empty:
        raise ValueError(f"No hay datos disponibles para el equipo {team}.")

    # Limitar los goles y salvadas a un máximo de 5
    all_stats['goals'] = all_stats['goals'].clip(upper=5)
    all_stats['goalkeeper_saves'] = all_stats['goalkeeper_saves'].clip(upper=5)

    # Limitar los porcentajes a 5 decimales y asegurar que estén en el rango correcto
    all_stats['possession%'] = all_stats['possession%'].round(5)
    all_stats['passes%'] = all_stats['passes%'].round(5)

    # Calcular la media de cada columna
    column_means = all_stats[['goals', 'possession%', 'goalkeeper_saves', 'passes%']].mean().round(3).to_dict()

    return column_means

def calculate_team_result(stats, home_goal_weight, away_goal_weight, possession_weight, passes_weight, saves_weight, opponent_goals):
    """Calcula el resultado de un equipo basado en sus estadísticas y los goles del equipo contrario."""
    result = (
        home_goal_weight * stats['goals'] -  # Multiplicar los goles del equipo actual
        away_goal_weight * opponent_goals +  # Restar los goles del equipo contrario
        possession_weight * stats['possession%'] +  # Añadir la posesión
        passes_weight * stats['passes%'] +  # Añadir la precisión de pases
        saves_weight * stats['goalkeeper_saves']  # Añadir las salvadas
    )

    return round(result * 100, 3)


def calculate_prediction(
    df,
    home_team, away_team,
    home_goal_weight, away_goal_weight,
    possession_weight, passes_weight, saves_weight
):
    # Verificar los pesos
    validate_weights(
        home_goal_weight, away_goal_weight, possession_weight, passes_weight, saves_weight
    )

    # Limitar los goles y paradas a un máximo de 5
    df['home_goals'] = df['home_goals'].clip(upper=5)
    df['away_goals'] = df['away_goals'].clip(upper=5)
    df['home_goalkeeper_saves'] = df['home_goalkeeper_saves'].clip(upper=5)
    df['away_goalkeeper_saves'] = df['away_goalkeeper_saves'].clip(upper=5)

    # Eliminar el signo "%" y convertir las columnas de porcentaje y pases a float
    for column in ['home_possession%', 'away_possession%', 'home_passes%', 'away_passes%']:
        df[column] = df[column].str.replace('%', '', regex=False).astype(float)

    # Normalizar los porcentajes a una escala de 0 a 5
    df[['home_possession%', 'away_possession%', 'home_passes%', 'away_passes%']] /= 100
    df[['home_possession%', 'away_possession%', 'home_passes%', 'away_passes%']] *= 5

    # Limitar a 5 decimales
    df[['home_possession%', 'away_possession%', 'home_passes%', 'away_passes%']] = df[['home_possession%', 'away_possession%', 'home_passes%', 'away_passes%']].round(5)

    # Convertir columnas de goles y salvadas a float
    for column in ['home_goals', 'away_goals', 'home_goalkeeper_saves', 'away_goalkeeper_saves']:
        df[column] = pd.to_numeric(df[column], errors='coerce')

    # Calcular estadísticas promedio para cada equipo
    home_team_stats = calculate_team_statistics(df, home_team)
    away_team_stats = calculate_team_statistics(df, away_team)

    # Aplicar la fórmula para cada equipo con pesos personalizados
    home_result = calculate_team_result(
        home_team_stats,
        home_goal_weight, away_goal_weight, possession_weight, passes_weight, saves_weight,
        opponent_goals=away_team_stats['goals']  # Pasar los goles del equipo visitante
    )

    # Aplicar la fórmula para el equipo visitante
    away_result = calculate_team_result(
        away_team_stats,
        home_goal_weight, away_goal_weight, possession_weight, passes_weight, saves_weight,
        opponent_goals=home_team_stats['goals']  # Pasar los goles del equipo local
    )

    return home_result, away_result, {
        home_team: home_team_stats,
        away_team: away_team_stats
    }