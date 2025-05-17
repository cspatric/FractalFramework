import typer
import os
import uvicorn
import sys
import time

from cli.commands.controller import make_controller
from cli.commands.model import make_model
from cli.commands.migration import make_migration
from cli.commands.migrate import run_migrations, run_migrations_rollback

from cli.commands.request import make_request
from cli.commands.test import make_test
from cli.commands.middleware import make_middleware
from cli.commands.service import make_service
from cli.commands.list_routes import list_routes

app = typer.Typer()


@app.command("serve")
def serve(host: str = "127.0.0.1", port: int = 8000):
    """
    Inicia o servidor FastAPI com Uvicorn
    """
    start = time.perf_counter()

    typer.echo("\n> fractal serve")
    typer.echo("\n\n  Fractal Framework v0.0.1  ⚡️ starting...\n")

    sys.path.insert(0, os.path.abspath("."))

    duration = int((time.perf_counter() - start) * 1000)
    typer.echo(typer.style(f"  Fractal Framework v0.0.1  ⚡️ ready in ~{duration}ms\n", fg=typer.colors.MAGENTA, bold=True))
    typer.echo(typer.style(f"  ➜  Fractal backend is live at http://{host}:{port}", fg=typer.colors.GREEN, bold=True))
    typer.echo(typer.style("  ➜  Need help? Visit http://help.com \n\n", fg=typer.colors.CYAN, bold=True))

    uvicorn.run("app.main:app", host=host, port=port, reload=True, log_level="info")


@app.command("make:controller")
def controller(name: str):
    make_controller(name)

@app.command("make:model")
def model(name: str):
    make_model(name)

@app.command("make:migration")
def migration(name: str):
    make_migration(name)

@app.command("make:request")
def request(name: str):
    make_request(name)

@app.command("make:test")
def test(name: str):
    make_test(name)

@app.command("make:middleware")
def middleware(name: str):
    make_middleware(name)

@app.command("make:service")
def service(name: str):
    make_service(name)

@app.command("migrate")
def migrate():
    """
    Executa todas as migrations existentes
    """
    run_migrations()

@app.command("migrate:rollback")
def migrate_rollback():
    """
    Remove todas as migrations executadas e recria tudo do zero.
    """
    run_migrations_rollback()

@app.command("make:env")
def make_env():
    """
    Cria o arquivo .env padrão na raiz do projeto
    """
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    env_path = os.path.join(project_root, ".env")

    if os.path.exists(env_path):
        typer.echo(typer.style("⚠️  .env já existe. Nenhuma alteração foi feita.", fg=typer.colors.YELLOW, bold=True))
        return

    content = """APP_NAME=Fractal
APP_ENV=local
APP_DEBUG=true

DB_CONNECTION=mysql+pymysql://
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=fractal_db
DB_USERNAME=fractal_user
DB_PASSWORD=secret
"""

    with open(env_path, "w") as f:
        f.write(content)

    typer.echo(typer.style("✅ Arquivo .env criado com sucesso na raiz do projeto!", fg=typer.colors.GREEN, bold=True))


@app.command("list:routes")
def list_routes_command():
    """
    Lista todas as rotas registradas no projeto
    """
    list_routes()

if __name__ == "__main__":
    app()
