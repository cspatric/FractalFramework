# back-side/cli/commands/request.py

import os

def make_request(name: str):
    path = f"app/http/requests/{name}.py"
    os.makedirs(os.path.dirname(path), exist_ok=True)

    content = f"""from pydantic import BaseModel

class {name}(BaseModel):
    # Exemplo de campo:
    # nome: str
    pass
"""

    with open(path, "w") as f:
        f.write(content)

    print(f"✔ Request '{name}' criado com sucesso em {path}")
