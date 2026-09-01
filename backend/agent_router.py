from ai_agent import analyze_question

from metrics import METRICS, DIMENSIONS

from query_engine import (
    get_total_summary,
    get_revenue_by_region,
    get_category_performance,
    get_top_profitable_products,
    get_profit_by_category,
    get_revenue_trend,
    get_top_products,
)


# --------------------------------------------------
# Semantic Layer Context
# --------------------------------------------------

SEMANTIC_CONTEXT = {
    "metrics": list(METRICS.keys()),
    "dimensions": list(DIMENSIONS.keys()),
}


# --------------------------------------------------
# Route AI Intent to Query Engine
# --------------------------------------------------

def run_metricmind_agent(question: str):

    # --------------------------------------------------
    # Step 1: Validate Question
    # --------------------------------------------------

    if not question or not question.strip():

        return {
            "success": False,
            "question": question,
            "ai_analysis": None,
            "semantic_context": SEMANTIC_CONTEXT,
            "data": None,
            "message": "Please enter a question."
        }

    question = question.strip()

    try:

        # --------------------------------------------------
        # Step 2: AI Understands the Question
        # --------------------------------------------------

        ai_result = analyze_question(question)

        print("AI RESULT:", ai_result)

        intent = ai_result.get("intent")
        limit = ai_result.get("limit")

        # --------------------------------------------------
        # Step 3: Approved Intent Handlers
        # --------------------------------------------------

        intent_handlers = {
            "get_total_summary": get_total_summary,
            "get_revenue_by_region": get_revenue_by_region,
            "get_category_performance": get_category_performance,
            "get_top_profitable_products": get_top_profitable_products,
            "get_profit_by_category": get_profit_by_category,
            "get_revenue_trend": get_revenue_trend,
            "get_top_products": get_top_products,
        }

        handler = intent_handlers.get(intent)

        # --------------------------------------------------
        # Step 4: Unknown Intent
        # --------------------------------------------------

        if handler is None:

            return {
                "success": False,
                "question": question,
                "ai_analysis": ai_result,
                "semantic_context": SEMANTIC_CONTEXT,
                "data": None,
                "message": (
                    "Sorry, I could not understand your question. "
                    "Please ask something related to revenue, profit, "
                    "products, categories, or regions."
                )
            }

        # --------------------------------------------------
        # Step 5: Validate Limit
        # --------------------------------------------------

        if limit is not None:

            try:
                limit = int(limit)

            except (ValueError, TypeError):

                limit = None

            if limit is not None:

                if limit < 1:
                    limit = 1

                if limit > 50:
                    limit = 50

        # --------------------------------------------------
        # Step 6: Execute Query
        # --------------------------------------------------

        if intent in [
            "get_top_products",
            "get_top_profitable_products"
        ]:

            data = handler(limit=limit)

        else:

            data = handler()

        # --------------------------------------------------
        # Step 7: Return Successful Response
        # --------------------------------------------------

        return {
            "success": True,
            "question": question,
            "ai_analysis": ai_result,
            "semantic_context": SEMANTIC_CONTEXT,
            "data": data
        }

    # --------------------------------------------------
    # Error Handling
    # --------------------------------------------------

    except Exception as e:

        print("METRICMIND ERROR:", str(e))

        return {
            "success": False,
            "question": question,
            "ai_analysis": None,
            "semantic_context": SEMANTIC_CONTEXT,
            "data": None,
            "message": (
                "MetricMind was unable to process your question. "
                "Please try again."
            ),
            "error": str(e)
        }