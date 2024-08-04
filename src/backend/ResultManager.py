from flask import Flask, jsonify
import pandas as pd
import os

app = Flask(__name__)

class ResultManager:
    def __init__(self, csv_filename='prediction_results.csv'):
        self.csv_filename = csv_filename

    def determine_winner(self, home_team, away_team, home_result, away_result):
        """
        Determina el ganador basado en los resultados.

        :param home_team: Nombre del equipo local.
        :param away_team: Nombre del equipo visitante.
        :param home_result: Resultado del equipo local.
        :param away_result: Resultado del equipo visitante.
        :return: Nombre del equipo ganador o "Empate".
        """
        # Considerar el resultado como empate si la diferencia es menor a 3
        if abs(home_result - away_result) < 10:
            return "Empate"
        elif home_result > away_result:
            return home_team
        else:
            return away_team

    def save_result_to_csv(self, home_team, away_team, home_result, away_result, winner):
        """
        Guarda el resultado del partido en un archivo CSV.

        :param home_team: Nombre del equipo local.
        :param away_team: Nombre del equipo visitante.
        :param home_result: Resultado del equipo local.
        :param away_result: Resultado del equipo visitante.
        :param winner: Nombre del equipo ganador.
        """
        # Crear un DataFrame con el resultado
        result_df = pd.DataFrame({
            'home_team': [home_team],
            'home_score': [home_result],
            'away_team': [away_team],
            'away_score': [away_result],
            'winner': [winner]
        })

        # Verificar si el archivo ya existe
        file_exists = os.path.isfile(self.csv_filename)

        # Usar el modo 'a' para agregar los resultados al archivo
        result_df.to_csv(self.csv_filename, mode='a', index=False, header=not file_exists)

    def get_last_n_results(self, n=10):
        """
        Obtiene los últimos n resultados del archivo CSV.

        :param n: Número de resultados a obtener.
        :return: DataFrame con los últimos n resultados.
        """
        if os.path.isfile(self.csv_filename):
            df = pd.read_csv(self.csv_filename)
            # Retorna los últimos n registros
            return df.tail(n)
        else:
            return pd.DataFrame()  # Retornar un DataFrame vacío si el archivo no existe

result_manager = ResultManager()