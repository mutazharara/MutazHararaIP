from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from app.db import engine
from app.models import User
from app.auth import require_admin, get_current_user, verify_password, hash_password
from app.schemas import UserProfileUpdate, PasswordUpdate
from app.models import UserActivity
from app.schemas import AdminUserUpdate

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/")
def get_all_users(admin=Depends(require_admin)):
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        return users
    
@router.get("/activities")
def get_all_activities(admin=Depends(require_admin)):
    with Session(engine) as session:
        activities = session.exec(
            select(UserActivity).order_by(UserActivity.created_at.desc())
        ).all()

        return activities
    
@router.get("/{user_id}/activities")
def get_user_activities(
    user_id: int,
    admin=Depends(require_admin)
):
    with Session(engine) as session:
        activities = session.exec(
            select(UserActivity)
            .where(UserActivity.user_id == user_id)
            .order_by(UserActivity.created_at.desc())
        ).all()

        return activities

@router.put("/me")
def update_my_profile(
    data: UserProfileUpdate,
    current_user: User = Depends(get_current_user)
):
    with Session(engine) as session:
        user = session.get(User, current_user.id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        existing_user = session.exec(
            select(User).where(User.email == data.email, User.id != user.id)
        ).first()

        if existing_user:
            raise HTTPException(status_code=400, detail="Email already in use")

        user.name = data.name
        user.email = data.email

        session.add(user)
        session.commit()
        session.refresh(user)

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
        }


@router.put("/me/password")
def change_my_password(
    data: PasswordUpdate,
    current_user: User = Depends(get_current_user)
):
    with Session(engine) as session:
        user = session.get(User, current_user.id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if not verify_password(data.current_password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Current password is incorrect")

        user.hashed_password = hash_password(data.new_password)

        session.add(user)
        session.commit()

        return {"message": "Password updated successfully"}


@router.put("/{user_id}")
def update_user_by_admin(
    user_id: int,
    data: AdminUserUpdate,
    admin=Depends(require_admin),
):
    with Session(engine) as session:
        user = session.get(User, user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.name = data.name
        user.email = data.email
        user.role = data.role
        user.is_active = data.is_active

        session.add(user)
        session.commit()
        session.refresh(user)

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
        }
    

@router.get("/")
def get_users(admin=Depends(require_admin)):
    with Session(engine) as session:
        return session.exec(select(User)).all()


@router.patch("/{user_id}/toggle-active")
def toggle_user_status(user_id: int, admin=Depends(require_admin)):
    with Session(engine) as session:
        user = session.get(User, user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.is_active = not user.is_active
        session.add(user)
        session.commit()
        session.refresh(user)

        return user


@router.patch("/{user_id}/make-admin")
def make_admin(user_id: int, admin=Depends(require_admin)):
    with Session(engine) as session:
        user = session.get(User, user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.role = "admin"
        session.add(user)
        session.commit()
        session.refresh(user)

        return user
    

@router.patch("/{user_id}/reset-password")
def reset_user_password(
    user_id: int,
    admin=Depends(require_admin)
):
    with Session(engine) as session:
        user = session.get(User, user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        temporary_password = "Temp123456"

        user.hashed_password = hash_password(temporary_password)

        session.add(user)
        session.commit()
        session.refresh(user)

        return {
            "message": f"Password reset successfully. Temporary password: {temporary_password}"
        }