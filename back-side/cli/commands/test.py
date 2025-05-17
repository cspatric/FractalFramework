# back-side/cli/commands/test.py

import os

def make_test(name: str):
    path = f"tests/{name.lower()}_test.py"
    os.makedirs(os.path.dirname(path), exist_ok=True)

    content = f"""def test_{name.lower()}():
    assert True  # Teste básico de {name}
"""

    with open(path, "w") as f:
        f.write(content)

    print(f"✔ Teste '{name}' criado com sucesso em {path}")
