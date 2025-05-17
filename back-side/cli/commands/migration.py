# back-side/cli/commands/migration.py

import os
from datetime import datetime

def make_migration(name: str):
    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{name}.py"
    path = os.path.join("app", "database", "migrations", filename)

    table_name = name.lower()

    content = f"""# Migration: {name}

from sqlalchemy import Column, Integer, String, Float, Table, MetaData

metadata = MetaData()

def upgrade(engine):
    table = Table(
        "{table_name}",
        metadata,
        Column("id", Integer, primary_key=True),
        Column("name", String(255), nullable=False),
        Column("price", Float, nullable=False)
    )
    table.create(bind=engine, checkfirst=True)

def downgrade(engine):
    metadata.reflect(bind=engine)
    if "{table_name}" in metadata.tables:
        metadata.tables["{table_name}"].drop(bind=engine, checkfirst=True)
"""

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

    print(f"✔ Migration '{filename}' created successfully at {path}")
