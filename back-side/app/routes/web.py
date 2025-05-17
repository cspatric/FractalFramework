from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from app.http.responses.html import render_with_component

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return render_with_component("Welcome", request)

@router.get("/login", response_class=HTMLResponse)
async def home(request: Request):
    return render_with_component("Auth/Login", request)

@router.get("/register", response_class=HTMLResponse)
async def home(request: Request):
    return render_with_component("Auth/Register", request)
