# back-side/cli/commands/service.py

import os

def make_service(name: str):
    path = f"app/services/{name}.py"
    os.makedirs(os.path.dirname(path), exist_ok=True)

    content = f"""# Serviço: {name}

def exemplo():
    return "{name} funcionando!"
"""

    with open(path, "w") as f:
        f.write(content)

    print(f"✔ Service '{name}' criado com sucesso em {path}")
