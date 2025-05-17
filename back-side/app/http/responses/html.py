from pathlib import Path
from fastapi.responses import HTMLResponse
import os

def render_with_component(component_name: str, request):
    project_dir = os.environ.get("PROJECT_DIR")
    
    if not project_dir:
        return HTMLResponse("<h1>Erro: PROJECT_DIR não definido</h1>", status_code=500)

    html_path = Path(project_dir) / "back-side" / "static" / "index.html"

    if not html_path.exists():
        return HTMLResponse(f"<h1>index.html não encontrado em {html_path}</h1>", status_code=500)

    content = html_path.read_text()

    content = content.replace(
        "<!-- COMPONENT_META -->",
        f'<meta name="x-page" content="{component_name}">'
    )

    return HTMLResponse(content)
