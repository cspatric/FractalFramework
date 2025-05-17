# back-side/cli/commands/list_routes.py

from app.main import app as fastapi_app

def list_routes():
    print("📄 Rotas registradas no FastAPI:\n")
    for route in fastapi_app.routes:
        if hasattr(route, "methods"):
            methods = ", ".join(route.methods)
            print(f"  {methods:<10} {route.path}")
