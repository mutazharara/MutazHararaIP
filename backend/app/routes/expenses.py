from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from app.db import engine
from app.models import Expense
from app.schemas import ExpenseCreate, ExpenseUpdate

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.get("/")
def get_expenses():
    with Session(engine) as session:
        expenses = session.exec(select(Expense)).all()
        return expenses

@router.post("/")
def create_expense(data: ExpenseCreate):
    with Session(engine) as session:
        expense = Expense(**data.model_dump())
        session.add(expense)
        session.commit()
        session.refresh(expense)
        return expense

@router.put("/{expense_id}")
def update_expense(expense_id: int, data: ExpenseUpdate):
    with Session(engine) as session:
        expense = session.get(Expense, expense_id)
        if not expense:
            raise HTTPException(status_code=404, detail="Expense not found")

        expense.title = data.title
        expense.category = data.category
        expense.amount = data.amount
        expense.date = data.date
        expense.description = data.description

        session.add(expense)
        session.commit()
        session.refresh(expense)
        return expense

@router.delete("/{expense_id}")
def delete_expense(expense_id: int):
    with Session(engine) as session:
        expense = session.get(Expense, expense_id)
        if not expense:
            raise HTTPException(status_code=404, detail="Expense not found")

        session.delete(expense)
        session.commit()
        return {"message": "Expense deleted successfully"}