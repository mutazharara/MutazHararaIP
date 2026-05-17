from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from app.db import engine
from app.models import Expense, UserActivity, User
from app.schemas import ExpenseCreate, ExpenseUpdate
from app.auth import get_current_user

router = APIRouter(prefix="/expenses", tags=["Expenses"])

    
@router.get("/")
def get_expenses(current_user: User = Depends(get_current_user)):
    with Session(engine) as session:
        expenses = session.exec(
            select(Expense).order_by(Expense.created_at.desc())
        ).all()
        return expenses


@router.post("/")
def create_expense(
    data: ExpenseCreate,
    current_user: User = Depends(get_current_user)
):
    with Session(engine) as session:
        expense = Expense(
            **data.model_dump(),
            user_id=current_user.id
        )

        session.add(expense)
        session.commit()
        session.refresh(expense)

        activity = UserActivity(
            user_id=current_user.id,
            action="CREATE_EXPENSE",
            description=f"Created expense: {expense.title}"
        )

        session.add(activity)
        session.commit()

        return expense


@router.put("/{expense_id}")
def update_expense(
    expense_id: int,
    data: ExpenseUpdate,
    current_user: User = Depends(get_current_user)
):
    with Session(engine) as session:
        expense = session.get(Expense, expense_id)

        if not expense:
            raise HTTPException(
                status_code=404,
                detail="Expense not found"
            )

        expense.title = data.title
        expense.category = data.category
        expense.amount = data.amount
        expense.date = data.date
        expense.description = data.description

        session.add(expense)
        session.commit()
        session.refresh(expense)

        activity = UserActivity(
            user_id=current_user.id,
            action="UPDATE_EXPENSE",
            description=f"Updated expense: {expense.title}"
        )

        session.add(activity)
        session.commit()

        return expense


@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    current_user: User = Depends(get_current_user)
):
    with Session(engine) as session:
        expense = session.get(Expense, expense_id)

        if not expense:
            raise HTTPException(
                status_code=404,
                detail="Expense not found"
            )

        expense_title = expense.title

        session.delete(expense)
        session.commit()

        activity = UserActivity(
            user_id=current_user.id,
            action="DELETE_EXPENSE",
            description=f"Deleted expense: {expense_title}"
        )

        session.add(activity)
        session.commit()

        return {
            "message": "Expense deleted successfully"
        }