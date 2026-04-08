from typing import Optional
from sqlmodel import SQLModel
from datetime import date

class ExpenseCreate(SQLModel):
    title: str
    category: str
    amount: float
    date: date
    description: Optional[str] = None

class ExpenseUpdate(SQLModel):
    title: str
    category: str
    amount: float
    date: date
    description: Optional[str] = None