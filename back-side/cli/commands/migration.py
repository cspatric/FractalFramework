import os
from datetime import datetime

def make_migration(name: str):
    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{name}.py"
    path = os.path.join("app", "database", "migrations", filename)

    content = f"""# Migration: {name}
def upgrade():
    # write commands to apply the migration
    pass

def downgrade():
    # write commands to undo the migration
    pass
"""

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

    print(f"✔ Migration '{filename}' created successfully.")
