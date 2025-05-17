from sqlalchemy import Column, Integer, String, Float, Table, MetaData

metadata = MetaData()

def upgrade(engine):
    table = Table(
        "produto",
        metadata,
        Column("id", Integer, primary_key=True),
        Column("name", String(255), nullable=False),
        Column("price", Float, nullable=False)
    )
    table.create(bind=engine, checkfirst=True)

def downgrade(engine):
    metadata.reflect(bind=engine)
    if "produto" in metadata.tables:
        metadata.tables["produto"].drop(bind=engine, checkfirst=True)
