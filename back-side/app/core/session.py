from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.db import get_database_url

DATABASE_URL = get_database_url()

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session():
    return SessionLocal()
