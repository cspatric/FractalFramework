from sqlalchemy.orm import declarative_base, Session
from sqlalchemy import select
from app.database.db import get_session

Base = declarative_base()

class ModelMixin:
    @classmethod
    def all(cls):
        with get_session() as session:
            return session.scalars(select(cls)).all()

    @classmethod
    def find(cls, id):
        with get_session() as session:
            return session.get(cls, id)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
