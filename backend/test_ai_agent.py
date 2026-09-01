from ai_agent import analyze_question


questions = [
    "Which region generated the most revenue?",
    "What is our total profit?",
    "Show me category performance",
    "What are our most profitable products?",
    "What is our profit margin?"
]


for question in questions:

    print("\nQuestion:")
    print(question)

    result = analyze_question(question)

    print("\nAI Result:")
    print(result)