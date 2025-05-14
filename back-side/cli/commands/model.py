import os

def make_model(name: str):
    filename = f"{name.lower()}.py"
    path = os.path.join("app", "database", "models", filename)

    content = f"""from sqlalchemy import Column, Integer, String
from app.database.connection import Base

class {name}(Base):
    __tablename__ = "{name.lower()}s"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
"""

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

    print(f"✔ Model '{name}' created successfully at {path}")
