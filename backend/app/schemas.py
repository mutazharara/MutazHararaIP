from typing import Optional
from sqlmodel import SQLModel
from datetime import date
from typing import Optional
from sqlmodel import SQLModel

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


class UserCreate(SQLModel):
    name: str
    email: str
    password: str

class UserLogin(SQLModel):
    email: str
    password: str

class UserRead(SQLModel):
    id: int
    name: str
    email: str
    role: str
    is_active: bool

class Token(SQLModel):
    access_token: str
    token_type: str


class UserProfileUpdate(SQLModel):
    name: str
    email: str


class PasswordUpdate(SQLModel):
    current_password: str
    new_password: str


class AdminUserUpdate(SQLModel):
    name: str
    email: str
    role: str
    is_active: bool

class VoiceExpenseRequest(SQLModel):
    text: str


class VoiceExpenseResponse(SQLModel):
    title: str
    category: str
    amount: float
    date: str
    description: Optional[str] = ""