from fastapi import Request
from app.http.responses.html import render_with_component

# simula um banco de dados
fake_products = [
    {"id": 1, "name": "Produto A", "price": 100},
    {"id": 2, "name": "Produto B", "price": 200},
]

class ProductController:
    @staticmethod
    async def index(request: Request):
        return render_with_component("Dashboard/product/Index", request, props={"products": fake_products})

    @staticmethod
    async def create(request: Request):
        return render_with_component("Dashboard/product/Create", request)

    @staticmethod
    async def edit(request: Request, id: int):
        product = next((p for p in fake_products if p["id"] == id), None)
        return render_with_component("Dashboard/product/edit", request, props={"product": product})
