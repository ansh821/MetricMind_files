import pandas as pd
from sqlalchemy import create_engine

# Load already cleaned CSV
df = pd.read_csv("superstore_clean.csv")

print("Data loaded successfully!")
print("Rows:", len(df))
print("Columns:", len(df.columns))

print("\nColumns available:")
print(df.columns.tolist())

# PostgreSQL connection
DATABASE_URL = "postgresql://postgres:AAyushi@localhost:5432/metricmind"

engine = create_engine(DATABASE_URL)

# Load existing clean data directly into PostgreSQL
df.to_sql(
    "sales",
    engine,
    if_exists="replace",
    index=False
)

print("\nSales data successfully loaded into PostgreSQL!")