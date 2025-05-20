from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from app.core.settings import settings

engine = create_engine(settings.database_url(), echo=settings.DEBUG)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session():
    return SessionLocal()
