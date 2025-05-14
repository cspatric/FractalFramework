import typer
from cli.commands.controller import make_controller
from cli.commands.model import make_model
from cli.commands.migration import make_migration

app = typer.Typer()

@app.command("make:controller")
def controller(name: str):
    make_controller(name)

@app.command("make:model")
def model(name: str):
    make_model(name)

@app.command("make:migration")
def migration(name: str):
    make_migration(name)

if __name__ == "__main__":
    app()
