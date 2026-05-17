from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import date, datetime

class Expense(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    category: str
    amount: float
    date: date
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str = Field(index=True, unique=True)
    hashed_password: str
    role: str = "user"
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now)


class UserActivity(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    action: str
    description: str
    created_at: datetime = Field(default_factory=datetime.utcnow)