from sqlalchemy import text

from database import engine
from metrics import METRICS, DIMENSIONS


# --------------------------------------------------
# Semantic Layer Helpers
# --------------------------------------------------

REVENUE = METRICS["revenue"]["definition"]
PROFIT = METRICS["profit"]["definition"]
PROFIT_MARGIN = METRICS["profit_margin"]["definition"]

REGION = DIMENSIONS["region"]["column"]
CATEGORY = DIMENSIONS["category"]["column"]
PRODUCT = DIMENSIONS["product"]["column"]
YEAR = DIMENSIONS["year"]["column"]


# --------------------------------------------------
# Total Revenue, Profit, Sales and Profit Margin
# --------------------------------------------------

def get_total_summary():

    query = f"""
        SELECT
            {REVENUE} AS total_revenue,
            {PROFIT} AS total_profit,
            SUM("Quantity") AS total_sales,
            ROUND(
                ({PROFIT_MARGIN})::numeric,
                2
            ) AS profit_margin
        FROM sales
    """

    with engine.connect() as connection:

        result = connection.execute(text(query))
        row = result.fetchone()

        return {
            "revenue": float(row.total_revenue or 0),
            "profit": float(row.total_profit or 0),
            "sales": int(row.total_sales or 0),
            "profit_margin": float(row.profit_margin or 0)
        }


# --------------------------------------------------
# Revenue By Region
# --------------------------------------------------

def get_revenue_by_region():

    query = f"""
        SELECT
            {REGION} AS region,
            {REVENUE} AS revenue
        FROM sales
        GROUP BY {REGION}
        ORDER BY revenue DESC
    """

    with engine.connect() as connection:

        result = connection.execute(text(query))

        return [
            {
                "region": row.region,
                "revenue": float(row.revenue or 0)
            }
            for row in result
        ]


# --------------------------------------------------
# Category Performance
# --------------------------------------------------

def get_category_performance():

    query = f"""
        SELECT
            {CATEGORY} AS category,
            {REVENUE} AS revenue,
            {PROFIT} AS profit,
            ROUND(
                ({PROFIT_MARGIN})::numeric,
                2
            ) AS profit_margin
        FROM sales
        GROUP BY {CATEGORY}
        ORDER BY revenue DESC
    """

    with engine.connect() as connection:

        result = connection.execute(text(query))

        return [
            {
                "category": row.category,
                "revenue": float(row.revenue or 0),
                "profit": float(row.profit or 0),
                "profit_margin": float(row.profit_margin or 0)
            }
            for row in result
        ]


# --------------------------------------------------
# Top 10 Profitable Products
# --------------------------------------------------

def get_top_profitable_products(limit=None):
    if limit is None:
        limit = 10

    limit = max(1, min(int(limit), 50))

    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT
                    "Product.Name" AS product,
                    SUM("Sales") AS revenue,
                    SUM("Profit") AS profit,
                    ROUND(
                        (
                            SUM("Profit")
                            / NULLIF(SUM("Sales"), 0)
                            * 100
                        )::numeric,
                        2
                    ) AS profit_margin
                FROM sales
                GROUP BY "Product.Name"
                ORDER BY profit DESC
                LIMIT :limit
            """),
            {"limit": limit}
        )

        return [
            {
                "product": row.product,
                "revenue": float(row.revenue or 0),
                "profit": float(row.profit or 0),
                "profit_margin": float(row.profit_margin or 0)
            }
            for row in result
        ]


def get_top_products(limit=None):
    if limit is None:
        limit = 5

    limit = max(1, min(int(limit), 50))

    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT
                    "Product.Name" AS product,
                    SUM("Sales") AS revenue
                FROM sales
                GROUP BY "Product.Name"
                ORDER BY revenue DESC
                LIMIT :limit
            """),
            {"limit": limit}
        )

        return [
            {
                "product": row.product,
                "revenue": float(row.revenue or 0)
            }
            for row in result
        ]
# --------------------------------------------------
# Profit By Category
# --------------------------------------------------

def get_profit_by_category():

    query = f"""
        SELECT
            {CATEGORY} AS category,
            {PROFIT} AS profit
        FROM sales
        GROUP BY {CATEGORY}
        ORDER BY profit DESC
    """

    with engine.connect() as connection:

        result = connection.execute(text(query))

        return [
            {
                "category": row.category,
                "profit": float(row.profit or 0)
            }
            for row in result
        ]


# --------------------------------------------------
# Revenue Trend
# --------------------------------------------------

def get_revenue_trend():

    query = f"""
        SELECT
            {YEAR} AS year,
            {REVENUE} AS revenue
        FROM sales
        GROUP BY {YEAR}
        ORDER BY {YEAR}
    """

    with engine.connect() as connection:

        result = connection.execute(text(query))

        return [
            {
                "month": str(row.year),
                "revenue": float(row.revenue or 0)
            }
            for row in result
        ]


