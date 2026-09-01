from agent_router import run_metricmind_agent
from response_generator import generate_response


question = "Which region generated the most revenue?"


# Run AI Agent
result = run_metricmind_agent(question)


# Generate business-friendly answer
answer = generate_response(
    question,
    result["ai_analysis"],
    result["data"]
)


print("\nQuestion:")
print(question)


print("\nAI Analysis:")
print(result["ai_analysis"])


print("\nMetricMind Answer:")
print(answer)