from fastapi import Request
from app.http.responses.html import render_with_component
from app.database.models.produto import Produto

class ProductController:
    @staticmethod
    async def index(request: Request):
        produtos = Produto.all()
        
        return render_with_component(
            "Dashboard/product/Index",
            request,
            props={"products": [p.to_dict() for p in produtos]}
        )

    @staticmethod
    async def create(request: Request):
        return render_with_component("Dashboard/product/Create", request)

    @staticmethod
    async def edit(request: Request, id: int):
        produto = Produto.find(id)
        return render_with_component(
            "Dashboard/product/edit",
            request,
            props={"product": produto.to_dict() if produto else None}
        )
