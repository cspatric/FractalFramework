from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from app.routes import web
from app.routes.fractal.error import register_error_handlers

app = FastAPI()

# Serve os arquivos buildados pelo Vite (js, css, etc.)
static_path = Path(__file__).resolve().parent.parent / "static"
app.mount("/static", StaticFiles(directory=static_path), name="static")

# Agora sim, registra as rotas do frontend
app.include_router(web.router)

register_error_handlers(app)
