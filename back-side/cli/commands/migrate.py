import os
import importlib.util
from sqlalchemy import text
from app.core.session import engine
import typer

def run_migrations():
    typer.echo(typer.style(f"🔗 Connecting to the database using:\n{engine.url}", fg=typer.colors.MAGENTA))

    try:
        conn = engine.connect()

        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS migrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL UNIQUE,
                executed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """))

        result = conn.execute(text("SELECT filename FROM migrations"))
        executed = set(r[0] for r in result.fetchall())

        migrations_path = os.path.join("app", "database", "migrations")
        files = sorted(os.listdir(migrations_path))

        for file in files:
            if file.endswith(".py") and file not in executed:
                filepath = os.path.join(migrations_path, file)
                spec = importlib.util.spec_from_file_location("migration", filepath)
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)

                if hasattr(module, "upgrade"):
                    typer.echo(typer.style(f"▶️  Running: {file}", fg=typer.colors.BLUE))
                    try:
                        module.upgrade(engine)
                        conn.execute(text("INSERT INTO migrations (filename) VALUES (:file)"), {"file": file})
                    except Exception as e:
                        typer.echo(typer.style(f"❌ Error in migration {file}:\n{e}", fg=typer.colors.RED, bold=True))
                        raise typer.Exit(code=1)

        typer.echo(typer.style("✅ All migrations were successfully executed!", fg=typer.colors.GREEN, bold=True))

    except Exception as e:
        typer.echo(typer.style(f"❌ Failed to connect to the database:\n{e}", fg=typer.colors.RED, bold=True))
        raise typer.Exit(code=1)


def run_migrations_rollback():
    typer.echo(typer.style(f"🔁 Rolling back migrations from:\n{engine.url}", fg=typer.colors.YELLOW))

    try:
        conn = engine.connect()

        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS migrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL UNIQUE,
                executed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """))

        result = conn.execute(text("SELECT filename FROM migrations ORDER BY id DESC"))
        applied_migrations = [r[0] for r in result.fetchall()]

        migrations_path = os.path.join("app", "database", "migrations")

        for file in applied_migrations:
            filepath = os.path.join(migrations_path, file)
            if not os.path.exists(filepath):
                continue

            spec = importlib.util.spec_from_file_location("migration", filepath)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)

            if hasattr(module, "downgrade"):
                typer.echo(typer.style(f"⬅️  Rolling back: {file}", fg=typer.colors.YELLOW))
                try:
                    module.downgrade(engine)
                except Exception as e:
                    typer.echo(typer.style(f"❌ Error while reverting {file}:\n{e}", fg=typer.colors.RED, bold=True))
                    raise typer.Exit(code=1)

        conn.execute(text("DELETE FROM migrations"))
        typer.echo(typer.style("🧹 All migrations were successfully rolled back!", fg=typer.colors.GREEN))

        run_migrations()

    except Exception as e:
        typer.echo(typer.style(f"❌ Failed to roll back migrations:\n{e}", fg=typer.colors.RED))
        raise typer.Exit(code=1)
