from fastapi import Request, Form, status
from fastapi.responses import RedirectResponse
from app.http.responses.html import render_with_component
from app.database.models.auth.user import User
from app.services.auth import hash_password, verify_password
from app.core.session import get_session
from sqlalchemy.exc import IntegrityError

class AuthController:

    @staticmethod
    async def index(request: Request):
        return render_with_component("Auth/Index", request)

    @staticmethod
    async def login_form(request: Request):
        return render_with_component("Auth/Login", request)

    @staticmethod
    async def register_form(request: Request):
        return render_with_component("Auth/Register", request)

    @staticmethod
    async def login(request: Request, email: str = Form(...), password: str = Form(...)):
        session = get_session()
        user = session.query(User).filter(User.email == email).first()
        if not user or not verify_password(password, user.password):
            return render_with_component("Auth/Login", request, props={"error": "Invalid credentials"})

        return RedirectResponse(url="/dashboard", status_code=status.HTTP_302_FOUND)

    @staticmethod
    async def register(
        request: Request,
        name: str = Form(...),
        email: str = Form(...),
        password: str = Form(...),
        password_confirm: str = Form(...)
    ):
        if password != password_confirm:
            return render_with_component("Auth/Register", request, props={"error": "Passwords do not match."})

        session = get_session()

        try:
            new_user = User(
                name=name,
                email=email,
                password=hash_password(password),
                password_confirm=hash_password(password_confirm)  # opcional, mas ok se quiser manter
            )

            session.add(new_user)
            session.commit()
            session.refresh(new_user)

        except IntegrityError:
            session.rollback()
            return render_with_component("Auth/Register", request, props={"error": "This email is already registered."})

        return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)
