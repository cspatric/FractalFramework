# back-side/cli/commands/middleware.py

import os

def make_middleware(name: str):
    path = f"app/http/middlewares/{name}.py"
    os.makedirs(os.path.dirname(path), exist_ok=True)

    content = f"""from fastapi import Request

async def {name.lower()}(request: Request, call_next):
    # Lógica antes da resposta
    response = await call_next(request)
    # Lógica após a resposta
    return response
"""

    with open(path, "w") as f:
        f.write(content)

    print(f"✔ Middleware '{name}' criado com sucesso em {path}")
