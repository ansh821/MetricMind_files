# --------------------------------------------------
# Generate Business-Friendly Response
# --------------------------------------------------

def generate_response(question, ai_analysis, data):

    intent = ai_analysis.get("intent")
    limit = ai_analysis.get("limit")

    # --------------------------------------------------
    # Total Summary
    # --------------------------------------------------

    if intent == "get_total_summary":

        revenue = data.get("revenue", 0)
        profit = data.get("profit", 0)
        profit_margin = data.get("profit_margin", 0)

        return (
            f"Here is your overall business summary:\n\n"
            f"Total Revenue: ${revenue:,.2f}\n"
            f"Total Profit: ${profit:,.2f}\n"
            f"Profit Margin: {profit_margin:.2f}%"
        )

    # --------------------------------------------------
    # Revenue by Region
    # --------------------------------------------------

    elif intent == "get_revenue_by_region":

        if not data:
            return "No regional revenue data was found."

        top_region = data[0]

        response = (
            f"Top Revenue Region: {top_region['region']}\n\n"
            f"{top_region['region']} generated "
            f"${top_region['revenue']:,.2f} in revenue.\n\n"
            f"Regional Performance:\n"
        )

        for item in data:
            response += (
                f"- {item['region']}: "
                f"${item['revenue']:,.2f}\n"
            )

        return response.strip()

    # --------------------------------------------------
    # Category Performance
    # --------------------------------------------------

    elif intent == "get_category_performance":

        if not data:
            return "No category performance data was found."

        response = "Category Performance:\n\n"

        for item in data:
            response += (
                f"- {item['category']}\n"
                f"  Revenue: ${item['revenue']:,.2f}\n"
                f"  Profit: ${item['profit']:,.2f}\n"
                f"  Profit Margin: {item['profit_margin']:.2f}%\n\n"
            )

        return response.strip()

    # --------------------------------------------------
    # Top Profitable Products
    # --------------------------------------------------

    elif intent == "get_top_profitable_products":

        if not data:
            return "No profitable product data was found."

        response = (
            f"Top {len(data)} Most Profitable Products:\n\n"
        )

        for index, item in enumerate(data, start=1):

            response += (
                f"{index}. {item['product']}\n"
                f"   Revenue: ${item['revenue']:,.2f}\n"
                f"   Profit: ${item['profit']:,.2f}\n"
                f"   Profit Margin: {item['profit_margin']:.2f}%\n\n"
            )

        return response.strip()

    # --------------------------------------------------
    # Top Products by Revenue
    # --------------------------------------------------

    elif intent == "get_top_products":

        if not data:
            return "No product data was found."

        response = (
            f"Top {len(data)} Products by Revenue:\n\n"
        )

        for index, item in enumerate(data, start=1):

            response += (
                f"{index}. {item['product']}\n"
                f"   Revenue: ${item['revenue']:,.2f}\n\n"
            )

        return response.strip()

    # --------------------------------------------------
    # Profit By Category
    # --------------------------------------------------

    elif intent == "get_profit_by_category":

        if not data:
            return "No category profit data was found."

        response = "Profit by Category:\n\n"

        for item in data:
            response += (
                f"- {item['category']}: "
                f"${item['profit']:,.2f}\n"
            )

        return response.strip()

    # --------------------------------------------------
    # Revenue Trend
    # --------------------------------------------------

    elif intent == "get_revenue_trend":

        if not data:
            return "No revenue trend data was found."

        response = "Revenue Trend:\n\n"

        for item in data:
            response += (
                f"- {item['month']}: "
                f"${item['revenue']:,.2f}\n"
            )

        return response.strip()

    # --------------------------------------------------
    # Unknown Intent
    # --------------------------------------------------

    return (
        "Sorry, I could not understand your question. "
        "Please ask a question related to revenue, profit, "
        "profit margin, regions, categories, or products."
    )