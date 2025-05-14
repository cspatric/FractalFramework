import os

def make_controller(name: str):
    filename = f"{name.lower()}_controller.py"
    path = os.path.join("app", "http", "controllers", filename)

    content = f"""from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def index():
    return {{"message": "Hello from {name}Controller"}}
"""

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

    print(f"✔ Controller '{name}' created successfully at {path}")
