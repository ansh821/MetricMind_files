from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from agent_router import run_metricmind_agent
from response_generator import generate_response
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

from database import engine, get_db
from models import User, ChatHistory, SavedQuestion


app = FastAPI(title="MetricMind API")


# --------------------------------------------------
# Allow React frontend to communicate with FastAPI.
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Home endpoint
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "MetricMind Backend is running!"
    }

# --------------------------------------------------
# Ask MetricMind - AI Agent Endpoint
# --------------------------------------------------

@app.post("/ask")
def ask_metricmind(
    question: str,
    user_id: int,
    db: Session = Depends(get_db)
):
    try:

        # --------------------------------------------------
        # Validate Question Before AI Processing
        # --------------------------------------------------

        if not question or not question.strip():
            return {
                "success": False,
                "question": question,
                "answer": "Please enter a question."
            }

        question = question.strip()

        # --------------------------------------------------
        # Step 1: AI understands the user's question
        # --------------------------------------------------

        result = run_metricmind_agent(question)


        # --------------------------------------------------
        # Step 2: Check if AI understood the question
        # --------------------------------------------------

        if not result["success"]:

            return {
                "success": False,
                "question": question,
                "answer": result["message"]
            }

        # --------------------------------------------------
        # Step 3: Generate business-friendly answer
        # --------------------------------------------------

        answer = generate_response(
            question,
            result["ai_analysis"],
            result["data"]
        )

        # --------------------------------------------------
        # Step 4: Save Chat History
        # --------------------------------------------------

        new_chat = ChatHistory(
            user_id=user_id,
            question=question,
            answer=answer
        )

        db.add(new_chat)
        db.commit()
        db.refresh(new_chat)

        # --------------------------------------------------
        # Step 5: Return Final Response
        # --------------------------------------------------

        return {
            "success": True,
            "message": "MetricMind analyzed your question successfully!",
            "chat_id": new_chat.chat_id,
            "user_id": new_chat.user_id,
            "question": question,
            "answer": answer,
            "ai_analysis": result["ai_analysis"]
        }

    except Exception as e:

        # Rollback database transaction if error occurs
        db.rollback()

        return {
            "success": False,
            "question": question,
            "answer": "Unable to analyze your question.",
            "error": str(e)
        }


# --------------------------------------------------
# PostgreSQL Connection Test
# --------------------------------------------------

@app.get("/db-test")
def database_test():

    try:

        with engine.connect() as connection:

            result = connection.execute(
                text("SELECT 1")
            )

        return {
            "status": "success",
            "message": "PostgreSQL connected successfully!",
            "result": result.scalar()
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }


# --------------------------------------------------
# Create a New User
# --------------------------------------------------

@app.post("/users")
def create_user(
    name: str,
    email: str,
    role: str = "Executive",
    db: Session = Depends(get_db)
):

    new_user = User(
        name=name,
        email=email,
        role=role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully!",
        "user_id": new_user.user_id,
        "name": new_user.name,
        "email": new_user.email,
        "role": new_user.role
    }


# --------------------------------------------------
# Save a Question
# --------------------------------------------------

@app.post("/saved-questions")
def save_question(
    question: str,
    user_id: int,
    db: Session = Depends(get_db)
):

    new_question = SavedQuestion(
        user_id=user_id,
        question=question
    )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return {
        "message": "Question saved successfully!",
        "id": new_question.id,
        "user_id": new_question.user_id,
        "question": new_question.question
    }


# --------------------------------------------------
# Get All Users
# --------------------------------------------------

@app.get("/users")
def get_users(
    db: Session = Depends(get_db)
):

    users = db.query(User).all()

    return [
        {
            "user_id": user.user_id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "created_at": user.created_at
        }
        for user in users
    ]


# --------------------------------------------------
# Get Chat History for a Specific User
# --------------------------------------------------

@app.get("/chat-history/{user_id}")
def get_chat_history(
    user_id: int,
    db: Session = Depends(get_db)
):

    chats = (
        db.query(ChatHistory)
        .filter(ChatHistory.user_id == user_id)
        .all()
    )

    return [
        {
            "chat_id": chat.chat_id,
            "user_id": chat.user_id,
            "question": chat.question,
            "answer": chat.answer,
            "created_at": chat.created_at
        }
        for chat in chats
    ]


# --------------------------------------------------
# Get Saved Questions for a Specific User
# --------------------------------------------------

@app.get("/saved-questions/{user_id}")
def get_saved_questions(
    user_id: int,
    db: Session = Depends(get_db)
):

    questions = (
        db.query(SavedQuestion)
        .filter(SavedQuestion.user_id == user_id)
        .all()
    )

    return [
        {
            "id": question.id,
            "user_id": question.user_id,
            "question": question.question,
            "created_at": question.created_at
        }
        for question in questions
    ]


# --------------------------------------------------
# Semantic Layer - Metrics and Dimensions
# --------------------------------------------------

@app.get("/metrics")
def get_metrics():

    return {
        "metrics": METRICS,
        "dimensions": DIMENSIONS
    }


# --------------------------------------------------
# Total Revenue, Profit and Profit Margin
# --------------------------------------------------
@app.get("/metrics/summary")
def metrics_summary():
    try:
        return get_total_summary()

    except Exception as e:
        return {
            "success": False,
            "error": "Unable to fetch dashboard summary.",
            "details": str(e)
        }



# --------------------------------------------------
# Revenue by Region
# --------------------------------------------------

@app.get("/metrics/revenue-by-region")
def revenue_by_region():
    try:
        return get_revenue_by_region()
    except Exception as e:
        return {
            "success": False,
            "error": "Unable to fetch revenue by region.",
            "details": str(e)
        }


# --------------------------------------------------
# Category Performance
# --------------------------------------------------

@app.get("/metrics/category-performance")
def category_performance():
    try:
        return get_category_performance()
    except Exception as e:
        return {
            "success": False,
            "error": "Unable to fetch category performance.",
            "details": str(e)
        }

# --------------------------------------------------
# Top 10 Profitable Products
# --------------------------------------------------

@app.get("/metrics/top-profitable-products")
def top_profitable_products():

    return get_top_profitable_products()



@app.get("/metrics/profit-by-category")
def profit_by_category():
    try:
        return get_profit_by_category()
    except Exception as e:
        return {
            "success": False,
            "error": "Unable to fetch profit by category.",
            "details": str(e)
        }

@app.get("/metrics/revenue-trend")
def revenue_trend():
    try:
        return get_revenue_trend()
    except Exception as e:
        return {
            "success": False,
            "error": "Unable to fetch revenue trend.",
            "details": str(e)
        }
    
@app.get("/metrics/top-products")
def top_products():
    try:
        return get_top_products()
    except Exception as e:
        return {
            "success": False,
            "error": "Unable to fetch top products.",
            "details": str(e)
        }