# back-side/cli/commands/migrate.py

import os
import importlib.util
from sqlalchemy import create_engine
from dotenv import load_dotenv
import typer

def run_migrations():
    load_dotenv()

    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        db_conn = os.getenv("DB_CONNECTION", "").strip()
        db_user = os.getenv("DB_USERNAME", "").strip()
        db_pass = os.getenv("DB_PASSWORD", "").strip()
        db_host = os.getenv("DB_HOST", "").strip()
        db_port = os.getenv("DB_PORT", "").strip()
        db_name = os.getenv("DB_DATABASE", "").strip()

        if not all([db_conn, db_user, db_pass, db_host, db_port, db_name]):
            typer.echo(typer.style("❌ .env incompleto ou banco não configurado.", fg=typer.colors.RED, bold=True))
            raise typer.Exit(code=1)

        db_url = f"{db_conn}://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

    typer.echo(typer.style(f"🔗 Conectando ao banco com:\n{db_url}", fg=typer.colors.MAGENTA))

    try:
        engine = create_engine(db_url)
        conn = engine.connect()

        conn.execute("""
            CREATE TABLE IF NOT EXISTS migrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL UNIQUE,
                executed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)

        result = conn.execute("SELECT filename FROM migrations")
        executadas = set(r[0] for r in result.fetchall())

        migrations_path = os.path.join("app", "database", "migrations")
        files = sorted(os.listdir(migrations_path))

        for file in files:
            if file.endswith(".py") and file not in executadas:
                filepath = os.path.join(migrations_path, file)
                spec = importlib.util.spec_from_file_location("migration", filepath)
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)

                if hasattr(module, "upgrade"):
                    typer.echo(typer.style(f"▶️  Executando: {file}", fg=typer.colors.BLUE))
                    try:
                        module.upgrade(engine)
                        conn.execute("INSERT INTO migrations (filename) VALUES (%s)", (file,))
                    except Exception as e:
                        typer.echo(typer.style(f"❌ Erro na migration {file}:\n{e}", fg=typer.colors.RED, bold=True))
                        raise typer.Exit(code=1)

        typer.echo(typer.style("✅ Todas as migrations foram executadas com sucesso!", fg=typer.colors.GREEN, bold=True))

    except Exception as e:
        typer.echo(typer.style(f"❌ Erro ao conectar ao banco de dados:\n{e}", fg=typer.colors.RED, bold=True))
        raise typer.Exit(code=1)

def run_migrations_rollback():
    load_dotenv()

    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        db_conn = os.getenv("DB_CONNECTION", "").strip()
        db_user = os.getenv("DB_USERNAME", "").strip()
        db_pass = os.getenv("DB_PASSWORD", "").strip()
        db_host = os.getenv("DB_HOST", "").strip()
        db_port = os.getenv("DB_PORT", "").strip()
        db_name = os.getenv("DB_DATABASE", "").strip()

        if not all([db_conn, db_user, db_pass, db_host, db_port, db_name]):
            typer.echo(typer.style("❌ .env incompleto ou inválido", fg=typer.colors.RED))
            raise typer.Exit(code=1)

        db_url = f"{db_conn}://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

    typer.echo(typer.style(f"🔁 Revertendo migrations de:\n{db_url}", fg=typer.colors.YELLOW))

    try:
        engine = create_engine(db_url)
        conn = engine.connect()

        conn.execute("""
            CREATE TABLE IF NOT EXISTS migrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL UNIQUE,
                executed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)

        result = conn.execute("SELECT filename FROM migrations ORDER BY id DESC")
        migrations_aplicadas = [r[0] for r in result.fetchall()]

        migrations_path = os.path.join("app", "database", "migrations")

        for file in migrations_aplicadas:
            filepath = os.path.join(migrations_path, file)
            if not os.path.exists(filepath):
                continue

            spec = importlib.util.spec_from_file_location("migration", filepath)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)

            if hasattr(module, "downgrade"):
                typer.echo(typer.style(f"⬅️  Revertendo: {file}", fg=typer.colors.YELLOW))
                try:
                    module.downgrade(engine)
                except Exception as e:
                    typer.echo(typer.style(f"❌ Erro ao reverter {file}:\n{e}", fg=typer.colors.RED, bold=True))
                    raise typer.Exit(code=1)

        conn.execute("DELETE FROM migrations")
        typer.echo(typer.style("🧹 Todas as migrations foram revertidas com sucesso!", fg=typer.colors.GREEN))

        run_migrations()

    except Exception as e:
        typer.echo(typer.style(f"❌ Falha ao reverter migrations:\n{e}", fg=typer.colors.RED))
        raise typer.Exit(code=1)
