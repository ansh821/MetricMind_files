from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from database import Base


# Users Table
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    role = Column(String(50), default="Executive")
    created_at = Column(DateTime, server_default=func.now())


# Chat History Table
class ChatHistory(Base):
    __tablename__ = "chat_history"

    chat_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    question = Column(Text, nullable=False)
    answer = Column(Text)
    created_at = Column(DateTime, server_default=func.now())


# Saved Questions Table
class SavedQuestion(Base):
    __tablename__ = "saved_questions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    question = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())