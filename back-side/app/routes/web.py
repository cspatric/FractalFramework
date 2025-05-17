from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from app.http.responses.html import render_with_component

from app.http.controllers.product_controller import ProductController

router = APIRouter()

# Usando controller (semelhante ao Laravel)
router.get("/product")(ProductController.index)
router.get("/product/create")(ProductController.create)
router.get("/product/edit/{id}")(ProductController.edit)

@router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return render_with_component("Welcome", request)

@router.get("/login", response_class=HTMLResponse)
async def home(request: Request):
    return render_with_component("Auth/Login", request)

@router.get("/register", response_class=HTMLResponse)
async def home(request: Request):
    return render_with_component("Auth/Register", request)
