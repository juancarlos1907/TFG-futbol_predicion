import requests
import pandas as pd

COUNTRIES_LIGUES = {
    "Spain": "La liga - 140",
    "England": "Premier League - 39",
    "Germany": "Bundesliga - 78",
    "Italy": "Serie A - 135",
    "France": "Ligue 1 - 61"
}

YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]


url = "https://api-football-v1.p.rapidapi.com/v3/teams"

columns = ["id", "name", "logo", "country", "league_name", "league_id"]
df = pd.DataFrame(columns=columns)

for year in YEARS:
    for c, l in COUNTRIES_LIGUES.items():
        code = int(l.split("-")[1].strip())
        league_name = str(l.split("-")[0].strip())
        querystring = {"league":str(code),"season":str(year), "country": c}

        headers = {
            "X-RapidAPI-Key": "8b45dee1f3msh06016ead9743a2ep1a92bbjsn32b39f9e413b",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)

        if response.status_code == 200:
            # Convertir la respuesta JSON en un diccionario
            response_dict = response.json()

        else:
            print(f"Error: {response.status_code}")

        response_teams = response_dict["response"]

        teams = list(map(lambda x: x["team"], response_teams))

        teams = list(map(lambda x : {"id":x["id"], "name": x["name"], "logo": x["logo"], "country": x["country"], "year":year, "league_name": league_name, "league_id": code}, teams))

        _df = pd.DataFrame(teams)
        df = pd.concat([df, _df], ignore_index=True)


df.to_csv('teams.csv', index=False)