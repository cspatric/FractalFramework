from sqlalchemy import Column, Integer, String, Float
from app.database.base import Base, ModelMixin

class Produto(Base, ModelMixin):
    __tablename__ = "produto"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
