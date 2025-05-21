from sqlalchemy import Column, Integer, String, DateTime, Table, MetaData, func

metadata = MetaData()

def upgrade(engine):
    table = Table(
        "users",
        metadata,
        Column("id", Integer, primary_key=True),
        Column("name", String(255), nullable=False),
        Column("email", String(255), nullable=False, unique=True, index=True),
        Column("password", String(255), nullable=False),
        Column("password_confirm", String(255), nullable=False),
        Column("created_at", DateTime(timezone=True), server_default=func.now()),
        Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
    )
    table.create(bind=engine, checkfirst=True)

def downgrade(engine):
    metadata.reflect(bind=engine)
    if "users" in metadata.tables:
        metadata.tables["users"].drop(bind=engine, checkfirst=True)
