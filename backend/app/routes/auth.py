from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from app.db import engine
from app.models import User, UserActivity
from app.schemas import UserCreate, UserLogin
from app.auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(data: UserCreate):
    with Session(engine) as session:
        if len(data.password.encode("utf-8")) > 72:
            raise HTTPException(
                status_code=400,
                detail="Password must be 72 bytes or less."
            )

        existing_user = session.exec(
            select(User).where(User.email == data.email)
        ).first()

        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        user = User(
            name=data.name,
            email=data.email,
            hashed_password=hash_password(data.password),
            role="user",
        )

        session.add(user)
        session.commit()
        session.refresh(user)

        return {"message": "User registered successfully"}


@router.post("/login")
def login(data: UserLogin):
    with Session(engine) as session:
        user = session.exec(
            select(User).where(User.email == data.email)
        ).first()

        if not user or not verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        if not user.is_active:
            raise HTTPException(
                status_code=403,
                detail="Your account is currently inactive. Please contact the administrator."
            )

        token = create_access_token({
            "user_id": user.id,
            "role": user.role
        })

        activity = UserActivity(
            user_id=user.id,
            action="LOGIN",
            description=f"{user.name} logged in"
        )
        session.add(activity)
        session.commit()

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            }
        }