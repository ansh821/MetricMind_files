import json
import ollama

from metrics import METRICS, DIMENSIONS


# --------------------------------------------------
# AI Intent Detection using Local Ollama Model
# --------------------------------------------------

def analyze_question(question: str):

    system_prompt = f"""
You are the AI intent classifier for MetricMind,
an Agentic Business Intelligence system.

Your job is to understand the user's business question
and identify which MetricMind analytics function should
be used.

Available Metrics:
{json.dumps(METRICS, indent=2)}

Available Dimensions:
{json.dumps(DIMENSIONS, indent=2)}


Available analytics functions:

1. get_total_summary
   Use for total revenue, total profit,
   or overall profit margin.

2. get_revenue_by_region
   Use for revenue analysis by region.

3. get_category_performance
   Use for category-level revenue, profit,
   and profit margin.

4. get_top_profitable_products
   Use for questions about the most profitable,
   best performing, or top profitable products.

5. get_profit_by_category
   Use for profit comparison across categories.

6. get_revenue_trend
   Use when the user asks about revenue over time,
   revenue trend, yearly revenue, or revenue growth.

7. get_top_products
   Use for questions asking for top products based on revenue/sales.

Important:
- If the user asks for "top N products", return get_top_products.
- Extract N from the question and return it in the "limit" field.
- Example: "Show me top 3 products" → limit = 3.
- Example: "Show me top 5 products" → limit = 5.
- If no number is provided, use limit = 5.


IMPORTANT:
You must detect the number of results requested by
the user.

Examples:

"Show me top 3 products"
→ limit = 3

"Show me top 5 products"
→ limit = 5

"Give me the top 10 products"
→ limit = 10

If the user does NOT specify a number,
return:

"limit": null

Do NOT invent a number.


Example 1:

Question:
"Which region generated the most revenue?"

Correct response:
{{
    "intent": "get_revenue_by_region",
    "metric": "revenue",
    "dimension": "region",
    "limit": null,
    "reason": "The user wants to find which region generated the highest revenue."
}}


Example 2:

Question:
"What are our most profitable products?"

Correct response:
{{
    "intent": "get_top_profitable_products",
    "metric": "profit",
    "dimension": "product",
    "limit": null,
    "reason": "The user wants to find the products with the highest profit."
}}


Example 3:

Question:
"Show me top 3 profitable products"

Correct response:
{{
    "intent": "get_top_profitable_products",
    "metric": "profit",
    "dimension": "product",
    "limit": 3,
    "reason": "The user wants the three most profitable products."
}}


Example 4:

Question:
"Show me top 5 products"

Correct response:
{{
    "intent": "get_top_products",
    "metric": "revenue",
    "dimension": "product",
    "limit": 5,
    "reason": "The user wants the five products with the highest revenue."
}}


Example 5:

Question:
"Show me category performance"

Correct response:
{{
    "intent": "get_category_performance",
    "metric": "revenue",
    "dimension": "category",
    "limit": null,
    "reason": "The user wants to compare business performance across categories."
}}


Example 6:

Question:
"What is our total profit?"

Correct response:
{{
    "intent": "get_total_summary",
    "metric": "profit",
    "dimension": null,
    "limit": null,
    "reason": "The user wants to know the overall profit."
}}


Example 7:

Question:
"What is our overall profit margin?"

Correct response:
{{
    "intent": "get_total_summary",
    "metric": "profit_margin",
    "dimension": null,
    "limit": null,
    "reason": "The user wants to know the overall profit margin."
}}


Example 8:

Question:
"Show revenue trend"

Correct response:
{{
    "intent": "get_revenue_trend",
    "metric": "revenue",
    "dimension": "year",
    "limit": null,
    "reason": "The user wants to see revenue performance over time."
}}


Return ONLY valid JSON.

The JSON format MUST be:

{{
    "intent": "function_name",
    "metric": "metric_name",
    "dimension": "dimension_name",
    "limit": number_or_null,
    "reason": "short explanation"
}}


If the question is not supported, return:

{{
    "intent": "unknown",
    "metric": null,
    "dimension": null,
    "limit": null,
    "reason": "Question is outside the currently supported analytics."
}}
"""

    response = ollama.chat(
        model="llama3.2:3b",
        format="json",
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": question
            }
        ]
    )

    result = response["message"]["content"].strip()

    print("QUESTION SENT TO AI:", question)
    print("OLLAMA RAW RESPONSE:", result)


    try:

        parsed_result = json.loads(result)

        # --------------------------------------------------
        # Validate limit
        # --------------------------------------------------

        limit = parsed_result.get("limit")

        if limit is not None:

            try:
                limit = int(limit)

                if limit <= 0:
                    limit = None

            except (ValueError, TypeError):
                limit = None

        parsed_result["limit"] = limit

        return parsed_result

    except json.JSONDecodeError:

        return {
            "intent": "unknown",
            "metric": None,
            "dimension": None,
            "limit": None,
            "reason": "AI returned an invalid JSON response.",
            "raw_response": result
        }