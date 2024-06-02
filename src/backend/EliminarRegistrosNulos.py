import pandas as pd

# Leer el archivo CSV
df = pd.read_csv('fixturesWithAllStatistics.csv')

# Eliminar los registros con valores nulos
df = df.dropna()

# Guardar el DataFrame sin registros nulos en un nuevo archivo CSV
df.to_csv('fixturesWithStatistics.csv', index=False)