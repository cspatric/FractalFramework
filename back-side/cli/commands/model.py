# back-side/cli/commands/model.py

import os

def make_model(name: str):
    filename = f"{name.lower()}.py"
    path = os.path.join("app", "database", "models", filename)

    content = f"""from sqlalchemy import Column, Integer, String
from app.database.base import Base  # certifique-se de ter esse arquivo

class {name}(Base):
    __tablename__ = "{name.lower()}s"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False)
"""

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

    print(f"✔ Model '{name}' criado com sucesso em {path}")
