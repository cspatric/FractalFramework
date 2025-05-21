from dotenv import load_dotenv
import os

load_dotenv()

def get_database_url():
    db_url = os.getenv("DATABASE_URL")
    if db_url:
        return db_url

    db_conn = os.getenv("DB_CONNECTION", "").strip()
    db_user = os.getenv("DB_USERNAME", "").strip()
    db_pass = os.getenv("DB_PASSWORD", "").strip()
    db_host = os.getenv("DB_HOST", "").strip()
    db_port = os.getenv("DB_PORT", "").strip()
    db_name = os.getenv("DB_DATABASE", "").strip()

    if not all([db_conn, db_user, db_pass, db_host, db_port, db_name]):
        raise ValueError("❌ .env is incomplete or database is not configured.")

    return f"{db_conn}://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
