from fastapi import HTTPException

from passlib.context import CryptContext

from ..schemas.auth_schemas import AuthResponse, LoginRequest

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

from ..db.models import User
from ..repositories.user_repository import UserRepository
from ..schemas.user_schemas import UserOut, UserCreate, UserWithRol
from ..config.security import create_access_token


class AuthService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def register(self, user: UserCreate) -> UserOut:
        existing_user = self.user_repository.get_user_by_email(user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = pwd_context.hash(user.password)

        user = User(
            username=user.username,
            email=user.email,
            password=hashed_password,
        )
        created_user = self.user_repository.create_user(user)
        return UserOut.model_validate(created_user)

    def login(self, login_request: LoginRequest) -> AuthResponse:
        user = self.user_repository.get_user_by_email(login_request.email)
        if not user or not pwd_context.verify(login_request.password, user.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        # Usar un diccionario simple en lugar de modelo Pydantic
        jwt_payload = {
            "id": str(user.id),
            "username": user.username,
            "email": user.email,
            "role_id": str(user.role_id) if user.role_id else None
        }

        access_token = create_access_token(data=jwt_payload)
        return AuthResponse(token=access_token)