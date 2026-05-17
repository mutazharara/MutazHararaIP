from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from app.db import engine
from app.routes.expenses import router as expenses_router
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.activity import router as activity_router
from app.routes.voice import router as voice_router

app = FastAPI()

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

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(expenses_router)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(activity_router)
app.include_router(voice_router)

@app.get("/")
def root():
    return {"message": "API running"}