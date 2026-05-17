from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db import engine
from app.models import UserActivity
from app.auth import require_admin

router = APIRouter(prefix="/activity", tags=["User Activity"])

@router.get("/")
def get_activity(admin=Depends(require_admin)):
    with Session(engine) as session:
        return session.exec(
            select(UserActivity).order_by(UserActivity.created_at.desc())
        ).all()