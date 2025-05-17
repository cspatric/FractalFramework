from fastapi import APIRouter

router = APIRouter()

# exemplo de rota
@router.get("/")
def read_root():
    return {"message": "Hello from API"}
