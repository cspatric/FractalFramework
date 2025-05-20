from sqlalchemy import Column, Integer, String, Float, Table, MetaData

metadata = MetaData()

produtos = Table(
    "produtos",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(255), nullable=False),
    Column("price", Float, nullable=False)
)

def upgrade(migrate_engine):
    metadata.bind = migrate_engine
    produtos.create(bind=migrate_engine)

def downgrade(migrate_engine):
    metadata.bind = migrate_engine
    produtos.drop(bind=migrate_engine)
