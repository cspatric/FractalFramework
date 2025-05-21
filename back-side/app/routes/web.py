from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from app.http.responses.html import render_with_component

from app.http.controllers.product_controller import ProductController
from app.http.controllers.auth.auth_controller import AuthController

router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return render_with_component("Welcome", request)

# Usando controller 
router.get("/product")(ProductController.index)
router.get("/product/create")(ProductController.create)
router.get("/product/edit/{id}")(ProductController.edit)

router.get("/")(AuthController.index)
router.get("/login")(AuthController.login_form)
router.post("/login/store")(AuthController.login)
router.get("/register")(AuthController.register_form)
router.post("/register/store")(AuthController.register)