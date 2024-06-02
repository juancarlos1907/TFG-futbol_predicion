import requests
import pandas as pd

COUNTRIES_LIGUES = {
    "Spain": ["La liga - 140", "Copa del rey - 143", "Supercopa - 556"],
    "England": ["Premier League - 39", "Copa de la liga (Carabao Cup o EFL Cup) - 46", "Supercopa (Community Shield) - 528"],
    "Germany": ["Bundesliga - 78", "Copa de Alemania (DFB Pokal) - 81", "Supercopa de Alemania - 529"],
    "Italy": ["Serie A - 135", "Copa de Italia - 137", "Supercopa de Italia - 547"],
    "France": ["Ligue 1 - 61", "Copa de Francia - 66", "Supercopa de Francia - 526"]
}

YEARS = [2019, 2020] #[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]


url = "https://api-football-v1.p.rapidapi.com/v3/fixtures"

columns = ["fixture_id", "home_team", "home_goals", "home_logo", "away_team", "away_goals", "away_logo", "country", "league_name", "league_id"]
df = pd.DataFrame(columns=columns)

headers = {
            "X-RapidAPI-Key": "8b45dee1f3msh06016ead9743a2ep1a92bbjsn32b39f9e413b",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }

for year in YEARS:
    for country, leagues in COUNTRIES_LIGUES.items():
        for league in leagues:
            code = int(league.split("-")[1].strip())
            league_name = league.split("-")[0].strip()
            querystring = {"league": str(code), "season": str(year)}
            print(f"Consulta para {league_name} (Código {code}): {querystring}")

            response = requests.get(url, headers=headers, params=querystring)

            if response.status_code == 200:
                # Convertir la respuesta JSON en un diccionario
                response_dict = response.json()

            else:
                print(f"Error: {response.status_code}")

            fixtures = response_dict.get("response", [])

            for fixture in fixtures:
                fixture_info = fixture.get("fixture", {})
                league_info = fixture.get("league", {})
                teams_info = fixture.get("teams", {})
                goals_info = fixture.get("goals", {})

                fixture_id = fixture_info.get("id")
                home_team = teams_info.get("home", {}).get("name")
                home_goals = goals_info.get("home")
                home_logo = teams_info.get("home", {}).get("logo")
                away_team = teams_info.get("away", {}).get("name")
                away_goals = goals_info.get("away")
                away_logo = teams_info.get("away", {}).get("logo")

                # Crear un diccionario con los datos del fixture
                fixture_data = {
                    "fixture_id": fixture_id,
                    "home_team": home_team,
                    "home_goals": home_goals,
                    "home_logo": home_logo,
                    "away_team": away_team,
                    "away_goals": away_goals,
                    "away_logo": away_logo,
                    "country": country,
                    "league_name": league_name,
                    "league_id": code,
                    "season": year
                }

                # Añadir los datos al DataFrame
                df = pd.concat([df, pd.DataFrame([fixture_data])], ignore_index=True)


df.to_csv('fixtures21y22.csv', index=False)