from fastapi.responses import HTMLResponse
from starlette.requests import Request
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi import status
import os, traceback
from pathlib import Path

def register_error_handlers(app):
    @app.exception_handler(StarletteHTTPException)
    async def custom_http_exception_handler(request: Request, exc: StarletteHTTPException):
        if exc.status_code == 404:
            return render_error_page("Route not found", request.url.path, status_code=404)
        return HTMLResponse(f"<h1>Error {exc.status_code}</h1><p>{exc.detail}</p>", status_code=exc.status_code)

    @app.exception_handler(Exception)
    async def custom_exception_handler(request: Request, exc: Exception):
        tb = traceback.format_exc()
        filename = extract_filename_from_traceback(tb)
        return render_error_page(str(exc), filename, status_code=500, trace=tb)

def extract_filename_from_traceback(trace: str):
    """
    Attempts to extract the filename from the traceback
    """
    for line in trace.splitlines():
        if "File" in line:
            return line.strip()
    return "Unknown"

def render_error_page(message: str, file_path: str, status_code: int = 500, trace: str = ""):
    project_dir = os.environ.get("PROJECT_DIR")
    if not project_dir:
        return HTMLResponse("<h1>PROJECT_DIR not defined</h1>", status_code=500)

    error_path = Path(project_dir) / "back-side" / "app" / "public" / "errors" / "error.html"
    if not error_path.exists():
        return HTMLResponse("<h1>error.html not found</h1>", status_code=500)

    content = error_path.read_text()
    content = content.replace("<!-- ERROR_MESSAGE -->", message)
    content = content.replace("<!-- ERROR_FILE -->", file_path)
    content = content.replace("<!-- ERROR_TRACE -->", f"<pre>{trace}</pre>")

    return HTMLResponse(content, status_code=status_code)
